import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Compra } from '../../models/compra';
import { Producto } from '../../models/producto';
import { CompraProducto } from '../../models/compra_producto';
import { CompraProductoService } from '../../services/compra-producto.service';
import { CompraService } from '../../services/compra.service';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-editar-compra',
  templateUrl: './crear-editar-compra.component.html',
  styleUrls: ['./crear-editar-compra.component.css']
})
export class CrearEditarCompraComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  compraForm: FormGroup;
  productosList: Producto[] = [];
  compraList: Compra[] = [];
  editMode: boolean;
  idCompraSeleccionada: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<CrearEditarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { edit: boolean, listaCompraSelect?: Compra, idCompraSelect?: number },
    private compraProductoService: CompraProductoService,
    private productoService: ProductoService,
    private compraService: CompraService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.editMode = data.edit;
    this.compraForm = this.fb.group({
      id: [null],
      descripcion: ['', Validators.required],
      id_usuario: [this.authService.getCurrentUser()?.id, Validators.required],
      productosFormArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProductosList();
    this.loadComprasList();
    if (this.editMode && this.data.idCompraSelect) {
      this.loadCompraData(this.data.idCompraSelect);
    }
  }

  loadComprasList() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.subscription.add(
        this.compraService.getCompraByUser(currentUser.id).subscribe({
          next: compras => this.compraList = compras,
          error: err => console.error('Error al cargar compras:', err)
        })
      );
    }
  }

  loadProductosList() {
    this.subscription.add(
      this.productoService.getAllProductos().subscribe({
        next: productos => this.productosList = productos,
        error: err => console.error('Error al cargar productos:', err)
      })
    );
  }

  loadCompraData(idCompra: number) {
    if (isNaN(idCompra)) {
      console.error('ID de compra inválido:', idCompra);
      return;
    }

    this.idCompraSeleccionada = idCompra;
    this.subscription.add(
      this.compraService.getCompra(idCompra).subscribe({
        next: (compra: Compra[]) => {
          if (compra.length > 0) {
            this.setEditForm(compra[0]);
            this.loadProductosDeCompra(idCompra);
          } else {
            console.error('Compra no encontrada');
          }
        },
        error: err => console.error('Error al cargar la compra:', err)
      })
    );
  }

  loadProductosDeCompra(idCompra: number) {
    this.subscription.add(
      this.compraProductoService.getCompraProductoByCompra(idCompra).subscribe({
        next: (productos: CompraProducto[]) => {
          this.setProductosFormArray(productos);
        },
        error: err => console.error('Error al cargar los productos de la compra', err)
      })
    );
  }

  setEditForm(compra: Compra) {
    this.compraForm.patchValue({
      id: compra.id,
      descripcion: compra.descripcion,
      id_usuario: compra.id_usuario
    });
  }

  setProductosFormArray(productos: CompraProducto[]) {
    const formArray = this.productosFormArray;
    formArray.clear();
    productos.forEach(producto => {
      formArray.push(this.fb.group({
        id_producto: [producto.id_producto, Validators.required],
        nombre: [producto.nombre, Validators.required],
        cantidad_stock: [producto.cantidad_stock ?? 0, [Validators.required, Validators.min(0)]],
        cantidad_comprar: [producto.cantidad_comprar, [Validators.required, Validators.min(1)]],
        cantidad_disponible: [producto.cantidad_disponible, [Validators.required, Validators.min(1), Validators.max(producto.cantidad_comprar)]],
        seleccionado: [false]
      }));
    });
  }

  get productosFormArray(): FormArray {
    return this.compraForm.get('productosFormArray') as FormArray;
  }

  onProductoSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const id_producto = Number(target.value);

    if (this.isProductoEnCompra(id_producto)) {
      console.log('Producto ya añadido en la compra.');
      return;
    }

    this.subscription.add(
      this.productoService.getProducto(id_producto).subscribe({
        next: producto => {
          const compraProducto: CompraProducto = {
            id_compra: this.idCompraSeleccionada!,
            id_producto: producto.id,
            cantidad_comprar: 1,
            cantidad_disponible: 1,
            seleccionado: false,
            nombre: producto.nombre,
            cantidad_stock: producto.cantidad_stock
          };
          this.addProductoToFormArray(compraProducto);
        },
        error: err => console.error('Error al seleccionar producto:', err)
      })
    );
  }

  isProductoEnCompra(id_producto: number): boolean {
    return this.productosFormArray.controls.some(control => control.value.id_producto === id_producto);
  }

  addProductoToFormArray(producto: CompraProducto) {
    const productoFormGroup = this.fb.group({
      id_producto: [producto.id_producto, Validators.required],
      nombre: [producto.nombre, Validators.required],
      cantidad_stock: [producto.cantidad_stock ?? 0, [Validators.required, Validators.min(0)]],
      cantidad_comprar: [producto.cantidad_comprar, [Validators.required, Validators.min(1)]],
      cantidad_disponible: [producto.cantidad_disponible, [Validators.required, Validators.min(1), Validators.max(producto.cantidad_comprar)]],
      seleccionado: [false]
    });
    this.productosFormArray.push(productoFormGroup);
  }

  onCompraSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const rawValue = target.value;
    console.log('El target.value es:', rawValue);

    // Extraer solo el número correcto del valor seleccionado
    const parts = rawValue.split(':');
    const idCompra = parts.length > 1 ? Number(parts[1].trim()) : NaN;

    console.log('El idCompra es:', idCompra);
    if (!isNaN(idCompra)) {
      this.loadCompraData(idCompra);
    } else {
      console.error('ID de compra inválido seleccionado:', rawValue);
    }
  }

  saveCompra() {
    if (this.compraForm.invalid) {
      console.error('El formulario no es válido');
      return;
    }

    const compraData = this.compraForm.value;

    if (this.editMode) {
      this.updateCompra(compraData);
    } else {
      this.addNewCompra(compraData);
    }
  }

  updateCompra(compraData: Compra) {
    this.subscription.add(
      this.compraService.updateCompra(compraData).subscribe({
        next: () => this.dialogRef.close(compraData),
        error: err => console.error('Error al actualizar la compra:', err)
      })
    );
  }

  addNewCompra(compraData: Compra) {
    this.subscription.add(
      this.compraService.createCompra(compraData).subscribe({
        next: (res: any) => {
          if (res && res.idCompra) {
            this.dialogRef.close();
          } else {
            console.error('No se pudo obtener el ID de la compra nueva.');
            alert('Error al crear la compra. Por favor, inténtelo de nuevo.');
          }
        },
        error: err => {
          console.error('Error al crear la compra: ', err);
          alert('Error al crear la compra. Por favor, inténtelo de nuevo.');
        }
      })
    );
  }

  deleteProductoCompra(index: number) {
    this.productosFormArray.removeAt(index);
  }

  abort() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
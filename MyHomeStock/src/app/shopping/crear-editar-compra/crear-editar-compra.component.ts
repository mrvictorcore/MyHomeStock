import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Compra } from '../../models/compra';
import { Producto } from '../../models/producto';
import { ProductoExtendido } from '../../models/producto_extendido';

@Component({
  selector: 'app-crear-editar-compra',
  templateUrl: './crear-editar-compra.component.html',
  styleUrls: ['./crear-editar-compra.component.css']
})
export class CrearEditarCompraComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  compraForm: FormGroup = this.fb.group({});
  productosList: Producto[] = [];
  compraList: Compra[] = [];
  editMode: boolean = false;
  idCompraSeleccionada: number | null = null;
  productosEliminaods: Array<{idCompra: number, idProducto: number}> = [];

  constructor(
    public dialogRef: MatDialogRef<CrearEditarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.editMode = data.edit;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loadProductosList();

    let formModelCompra = {
      id: [null],
      descripcion: ['', Validators.required],
      id_usuario: [1, Validators.required],
      listaCompraSeleccionadaId: [null],
      productosFormArray: this.fb.array([], Validators.required)
    };

    if (this.editMode && this.data.listaCompraSelect) {
      formModelCompra.id = [this.data.listaCompraSelect ? this.data.listaCompraSelect.id : null, Validators.required];
      formModelCompra.descripcion = [this.data.listaCompraSelect ? this.data.listaCompraSelect.descripcion : '', Validators.required];
      formModelCompra.id_usuario = [this.data.listaCompraSelect ? this.data.listaCompraSelect.id_usuario : 0, Validators.required];
      formModelCompra.listaCompraSeleccionadaId = [this.data.listaCompraSelect ? this.data.listaCompraSelect.id : null, Validators.required];
      this.loadCompraData(this.data.idCompraSelect);
      this.loadComprasList();
    }

    this.compraForm = this.fb.group(formModelCompra);
    if (this.editMode) {
      this.loadComprasList();

      this.subscription.add(
        this.compraForm.get('listaCompraSeleccionadaId')?.valueChanges.subscribe(idCompraSeleccionada => {
          if (idCompraSeleccionada) {
            this.data.listaCompraSelect = idCompraSeleccionada;
            this.idCompraSeleccionada = idCompraSeleccionada;
            this.productosFormArray.clear();
            this.loadCompraData(idCompraSeleccionada);
          }
        })
      );
    }
  }

  loadProductosList() {
    this.subscription.add(
      this.appService.getProductos().subscribe({
        next: (productos) => this.productosList = productos,
        error: (err) => console.error('Error al cargar productos:', err)
      })
    );
  }

  loadComprasList() {
    this.subscription.add(
      this.appService.getCompras().subscribe({
        next: (compras) => this.compraList = compras,
        error: (err) => console.error('Error al cargar compras:', err)
      })
    );
  }

  loadCompraData(idCompra: number) {
    this.subscription.add(
      this.appService.getCompra(idCompra).subscribe({
        next: (compra) => {
          this.compraForm.patchValue(compra);
          this.loadProductosDeCompra(idCompra);
        },
        error: (err) => console.error('Error al cargar la compra:', err)
      })
    );
  }

  loadProductosDeCompra(idCompra: number) {
    this.appService.getProductosDeCompra(idCompra).subscribe({
      next: (res: any) => {
        const productosCompra = res.data;
        this.productosFormArray.clear();
        productosCompra.forEach( (producto: any) => {
          this.addProductoToFormArray(producto);
        });
      },
      error: (err) => console.error('Error al cargar los productos de la compra', err)
    });
  }

  addProductoToFormArray(producto: ProductoExtendido) {
    const productoFormGroup = this.fb.group({
      id_producto: [producto.id, Validators.required],
      nombreProducto: [producto.nombre, Validators.required],
      stockProducto: [ producto.cantidad_stock !== null && producto.cantidad_stock !== undefined ? producto.cantidad_stock : 0, [Validators.required, Validators.min(0)]],
      cantidad: [producto.cantidad, [Validators.required, Validators.min(1)]],
      id_compra: [this.idCompraSeleccionada ? this.idCompraSeleccionada : this.data.listaCompraSelect.id]
    });
    this.productosFormArray.push(productoFormGroup);
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
      this.appService.getProducto(id_producto).subscribe({
        next: (respuesta) => {
          if (respuesta && respuesta.length > 0) {
            const producto = respuesta[0];
            const productoExtendido: ProductoExtendido = {
              ...producto,
              cantidad: 1,
              id_compra: null
            };
            this.addProductoToFormArray(productoExtendido);
          } else {
            console.error('No se encontraron productos con el ID:', id_producto);
          }
        },
        error: (err) => console.error('Error al seleccionar producto:', err)
      })
    );
  }

  isProductoEnCompra(id_producto: number): boolean {
    return this.productosFormArray.controls.some(
      control => control.value.id_producto === id_producto
    );
  }

  saveCompra() {
    if (this.compraForm.invalid) {
      console.error('El formulario no es válido');
      return;
    }
    
    const compraData = this.compraForm.value;
    const productos = this.productosFormArray.value as ProductoExtendido[];

    if (this.editMode) {
      this.updateCompra(compraData);
      this.manageProductosInCompra(compraData.id, productos).subscribe({
        next: (res) => {
          console.log('Producto eliminado con éxito: ', res);
          this.deleteProductoCompraDefinitivo();
        },
        error: (err) => console.error('Error al eliminar el producto: ', err)
      });
    } else {
      this.addNewCompra();
    }
  }

  manageProductosInCompra(idCompra: number, productos: any[]): Observable<any> {
    const updates = productos.map(producto => {
      if (producto.id_producto && producto.id_compra === idCompra && this.editMode) {
        return this.appService.updateCompraProducto(idCompra, producto.id_producto, producto);
      } else {
        return this.appService.addCompraProducto({...producto, id_compra: idCompra});
      }
    });

    return forkJoin(updates);
  }

  updateCompra(compraData: any) {
    this.subscription.add(
      this.appService.updateCompra(compraData).subscribe({
        next: (res) => {
          console.log('Compra actualizada con éxito:', res);
          const productos = this.productosFormArray.value as ProductoExtendido[];
          this.manageProductosInCompra(compraData.id, productos).subscribe({
            next: (res) => {
              console.log('Producto actualizado con éxito: ', res);
            },
            error: (err) => console.error('Error al actualizar los productos: ', err)  
          });
        },
        error: (err) => console.error('Error al actualizar la compra:', err)
      })
    );
  }

  addNewCompra() {
    const compraData = this.compraForm.getRawValue();
    delete compraData.productosFormArray;
  
    this.subscription.add(
      this.appService.addCompras(compraData).subscribe({
        next: (res: any) => {
          if (res && res.data && res.data.id) {
            const idCompra = res.data.id;
            const productos = (this.productosFormArray.value as ProductoExtendido[]).map(producto => {
              return { ...producto, id_compra: idCompra };
            });
  
            this.manageProductosInCompra(idCompra, productos).subscribe({
              next: () => {
                console.log('Productos añadidos con éxito.');
                this.dialogRef.close();
              },
              error: (err) => console.error('Error al añadir productos a la compra: ', err)
            });
          } else {
            console.error('No se pudo obtener el ID de la compra nueva.');
            alert('Error al crear la compra. Por favor, inténtelo de nuevo.');
          }
        },
        error: (err) => {
          console.error('Error al crear la compra: ', err);
          alert('Error al crear la compra. Por favor, inténtelo de nuevo.');
        }
      })
    );
  }  

  deleteProductoCompra(index: number) {
    const idCompra = this.productosFormArray.at(index).value.id_compra;
    const idProducto = this.productosFormArray.at(index).value.id_producto;

    if (idCompra && idProducto) {
      this.productosEliminaods.push({idCompra, idProducto});
    }
    this.productosFormArray.removeAt(index);
  }

  deleteProductoCompraDefinitivo() {
    const eliminaciones = this.productosEliminaods.map(eliminar => {
      this.appService.deleteCompraProducto(eliminar.idCompra, eliminar.idProducto).toPromise()
      this.dialogRef.close();
    });

    Promise.all(eliminaciones)
      .then(res => {
        console.log('Todos los productos han sido eliminados con éxito: ', res);
        this.productosEliminaods = [];
      })
      .catch(err => {
        console.error('Error al eliminar los productos: ', err);
      })
  }

  abort() {
    this.productosEliminaods = [];
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

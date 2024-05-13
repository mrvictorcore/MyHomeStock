import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Compra } from '../models/compra';
import { CompraProducto } from '../models/compra_producto';
import { CrearEditarCompraComponent } from './crear-editar-compra/crear-editar-compra.component';
import { ConfirmarCompraComponent } from './confirmar-compra/confirmar-compra.component';
import { BorrarCompraComponent } from './borrar-compra/borrar-compra.component';
import { CompraProductoService } from '../services/compra-producto.service';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  compraForm: FormGroup = this.fb.group({});
  compraList: Compra[] = [];
  selectCompraId: number | null = null;

  constructor(
    private compraService: CompraService,
    private compraProductoService: CompraProductoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCompraData();
  }

  initializeForm() {
    this.compraForm = this.fb.group({
      compraListSelect: [''],
      todosSeleccionados: [false],
      productosFormArray: this.fb.array([])
    });

    this.loadCompraData();
  }

  loadCompraData() {
    this.compraService.getAllCompras().subscribe({
      next: compras => {
        this.compraList = compras;
        this.selectCompraId = compras[0].id;
        this.compraForm.get('compraListSelect')?.setValue(this.selectCompraId);
        this.loadProductosComprar(this.selectCompraId || 0)
      },
      error: err => console.error('No se pudieron cargar las compras: ', err)
    });
  }

  loadProductosComprar(idCompra: number) {
    this.compraProductoService.getCompraProductoWithCantidad(idCompra).subscribe({
        next: (productos: any[]) => {
          if (productos.length > 0) {
              this.setProductosFormArray(productos);
          } else {
              console.log('No hay productos asociados a esta compra:', idCompra);
              console.log(productos);
          }
        },
        error: (err) => console.error('Error al cargar los productos de la compra', err)
    });
  }

  setProductosFormArray(productos: any[]) {
    const formArray = this.compraForm.get('productosFormArray') as FormArray;
    formArray.clear();
    productos.forEach(producto => {
      formArray.push(this.fb.group({
        id_compra: [this.selectCompraId],
        id_producto: [producto.id_producto],
        nombreProducto: [producto.nombre],
        cantidad_comprar: [producto.cantidad_comprar],
        cantidad_disponible: [producto.cantidad_comprar],
        seleccionado: [false]
      }));
    });
  }

  get productosFormArray(): FormArray {
    return this.compraForm.get('productosFormArray') as FormArray;
  }

  getProductosSeleccionados(): CompraProducto[] {
    return (this.compraForm.get('productosFormArray') as FormArray).value
      .filter((p: CompraProducto) => p.seleccionado)
      .map((p: CompraProducto) => ({
        id_compra: p.id_compra,
        id_producto: p.id_producto,
        cantidad_comprar: p.cantidad_comprar,
        cantidad_disponible: +p.cantidad_disponible,
        seleccionado: p.seleccionado
    }));
  }

  onListCompraChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const idCompra = Number(target.value);
    this.selectCompraId = idCompra
    this.loadProductosComprar(idCompra);
  }

  generarRangoCantidadDisponible(cantidad: number): number[] {
    return Array.from({ length: cantidad }, (_, i) => i + 1).reverse();
  }

  seleccionarTodos() {
    const todosSeleccionados = this.compraForm.get('todosSeleccionados')?.value;
    (this.compraForm.get('productosFormArray') as FormArray).controls.forEach(control => {
      control.get('seleccionado')?.setValue(todosSeleccionados);
    });
  }

  onCrearCompra() {
    this.dialog.open(CrearEditarCompraComponent, {
      width: "400px",
      data: {edit: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadCompraData();
      }
    });
  }

  onEditarCompra() {
    if (this.selectCompraId != null) {
      const compraSeleccionada = this.compraList.find(compra => compra.id === this.selectCompraId);

      this.dialog.open(CrearEditarCompraComponent, {
        width: "400px",
        data: {edit: true, listaCompraSelect: compraSeleccionada, idCompraSelect: this.selectCompraId}
      }).afterClosed().subscribe(result => {
        if (result) {
          this.loadCompraData();
        }
      });
    }
  }

  onConfirmarClick() {
    if (this.compraForm.valid) {
      this.dialog.open(ConfirmarCompraComponent, {
        width: "400px"
      }).afterClosed().subscribe(result => {
        if (result) {
          this.updateCompra();
        }
      });
    }
  }

  onBorrarClick(){
    if (this.compraForm.valid) {
      this.dialog.open(BorrarCompraComponent, {
        width: "400px"
      }).afterClosed().subscribe(result => {
        if (result) {
          this.deleteCompra();
        }
      });
    }
  }
  
  updateCompra() {
    if (!this.selectCompraId) {
      console.error('No hay compra seleccionada');
      return;
    }

    const productosUpdate = this.getProductosSeleccionados();

    if (productosUpdate.length === 0) {
      console.log('No hay productos seleccionados');
      return;
    }

    productosUpdate.forEach((compraProducto: CompraProducto) => {
      this.compraProductoService.updateCompraProducto(compraProducto).subscribe({
        next: () => {
          console.log(`El producto ${compraProducto.id_producto} de la compra ${compraProducto.id_compra} ha sido actualizado`);
        },
        error: err => {
          console.error('Error al actualizar el producto: ', err);
        },
        complete: () => {
          console.log('Todos los productos seleccionados han sido actualizados');
          this.loadCompraData();
        }
      });
    });
  }

  deleteCompra() {}
}

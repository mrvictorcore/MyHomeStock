import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Compra } from '../models/compra';
import { ProductoExtendido } from '../models/producto_extendido';
import { CompraProducto } from '../models/compra_producto';
import { CrearEditarCompraComponent } from './crear-editar-compra/crear-editar-compra.component';
import { ConfirmarCompraComponent } from './confirmar-compra/confirmar-compra.component';
import { BorrarCompraComponent } from './borrar-compra/borrar-compra.component';

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
    private appService: AppService, 
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
    this.appService.getCompras().subscribe({
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
    this.appService.getProductosDeCompra(idCompra).subscribe({
        next: (res: any) => {
          const productos = res.data;
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

  setProductosFormArray(productos: ProductoExtendido[]) {
    const formArray = this.compraForm.get('productosFormArray') as FormArray;
    formArray.clear();
    productos.forEach(producto => {
      formArray.push(this.fb.group({
        id_compra: [this.selectCompraId],
        id_producto: [producto.id],
        nombreProducto: [producto.nombre],
        cantidad: [producto.cantidad],
        cantidadSeleccionada: [1],
        seleccionado: [false]
      }));
    });
  }

  get productosFormArray(): FormArray {
    return this.compraForm.get('productosFormArray') as FormArray;
  }

  getProductosSeleccionados(): CompraProducto[] {
    return (this.compraForm.get('productosFormArray') as FormArray).value
      .filter((p: any) => p.seleccionado)
      .map((p: any) => ({
        id_compra: this.compraForm.get('listaCompraSeleccionada')?.value,
        id_producto: p.id_producto,
        cantidad: p.cantidadSeleccionada,
        seleccionado: p.seleccionado
    }));
  }

  onListCompraChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const idCompra = Number(target.value);
    this.selectCompraId = idCompra
    this.loadProductosComprar(idCompra);
  }

  generarRangoCantidadRestar(cantidad: number): number[] {
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
  
  updateCompra() {}

  deleteCompra() {}
}

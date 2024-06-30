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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    compraListSelect: [''],
    todosSeleccionados: [false],
    productosFormArray: this.fb.array([])
  });
  compraList: Compra[] = [];
  selectCompraId: number | null = null;

  constructor(
    private compraService: CompraService,
    private compraProductoService: CompraProductoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCompraData();
  }

  get productosFormArray(): FormArray {
    return this.formGroup.get('productosFormArray') as FormArray;
  }

  loadCompraData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.compraService.getCompraByUser(currentUser.id).subscribe({
        next: compras => {
          this.compraList = compras;
          this.selectCompraId = compras.length > 0 ? compras[0].id : null;
          if (this.selectCompraId) {
            this.formGroup.get('compraListSelect')?.setValue(this.selectCompraId);
            this.loadProductosComprar(this.selectCompraId);
          }
        },
        error: err => console.error('No se pudieron cargar las compras: ', err)
      });
    }
  }

  loadProductosComprar(idCompra: number) {
    this.compraProductoService.getCompraProductoWithCantidad(idCompra).subscribe({
      next: productos => this.setProductosFormArray(productos),
      error: err => console.error('Error al cargar los productos de la compra', err)
    });
  }

  setProductosFormArray(productos: CompraProducto[]) {
    const formArray = this.productosFormArray;
    formArray.clear();
    productos.forEach(producto => {
      formArray.push(this.fb.group({
        id_compra: [this.selectCompraId],
        id_producto: [producto.id_producto],
        nombre: [producto.nombre],
        cantidad_comprar: [producto.cantidad_comprar],
        seleccionado: [false]
      }));
    });
  }

  getProductosSeleccionados(): CompraProducto[] {
    return this.productosFormArray.value
      .filter((p: CompraProducto) => p.seleccionado)
      .map((p: CompraProducto) => ({
        id_compra: p.id_compra,
        id_producto: p.id_producto,
        cantidad_comprar: p.cantidad_comprar,
        seleccionado: p.seleccionado
      }));
  }

  onListCompraChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const idCompra = Number(target.value);
    this.selectCompraId = idCompra;
    this.loadProductosComprar(idCompra);
  }

  seleccionarTodos() {
    const todosSeleccionados = this.formGroup.get('todosSeleccionados')?.value;
    this.productosFormArray.controls.forEach(control => {
      control.get('seleccionado')?.setValue(todosSeleccionados);
    });
  }

  onCrearCompra() {
    this.dialog.open(CrearEditarCompraComponent, {
      width: "400px",
      data: { edit: false }
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
        data: { edit: true, listaCompraSelect: compraSeleccionada, idCompraSelect: this.selectCompraId }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.loadCompraData();
        }
      });
    }
  }

  onConfirmarClick() {
    if (this.formGroup.valid) {
      this.dialog.open(ConfirmarCompraComponent, {
        width: "400px"
      }).afterClosed().subscribe(result => {
        if (result) {
          this.confirmarCompra();
        }
      });
    }
  }

  onBorrarClick() {
    if (this.formGroup.valid) {
      this.dialog.open(BorrarCompraComponent, {
        width: "400px"
      }).afterClosed().subscribe(result => {
        if (result) {
          this.deleteCompra();
        }
      });
    }
  }

  confirmarCompra() {
    if (!this.selectCompraId) {
      console.error('No hay compra seleccionada');
      return;
    }

    const productosUpdate = this.getProductosSeleccionados();

    if (productosUpdate.length === 0) {
      console.log('No hay productos seleccionados');
      return;
    }

    this.compraProductoService.confirmarCompra(this.selectCompraId, productosUpdate).subscribe({
      next: () => {
        console.log('Compra confirmada exitosamente');
        this.loadCompraData();
      },
      error: err => {
        console.error('Error al confirmar la compra: ', err);
      }
    });
  }

  deleteCompra() {
    if (!this.selectCompraId) {
      console.error('No hay compra seleccionada');
      return;
    }

    this.compraService.deleteCompra(this.selectCompraId).subscribe({
      next: () => {
        console.log('Compra eliminada exitosamente');
        this.loadCompraData();
      },
      error: err => {
        console.error('Error al eliminar la compra: ', err);
      }
    });
  }
}
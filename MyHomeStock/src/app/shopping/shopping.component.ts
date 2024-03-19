import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Compra } from '../models/compra';
import { ConfirmarCompraComponent } from './confirmar-compra/confirmar-compra.component';
import { CrearEditarCompraComponent } from './crear-editar-compra/crear-editar-compra.component';
import { BorrarCompraComponent } from './borrar-compra/borrar-compra.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit{
  listaCompra: Compra[] = [];
  checkAuto: boolean = false;
  existeListaActiva: boolean = false;

  constructor(
    private appService: AppService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras() {
    this.appService.getCompras().subscribe(compras => {
      this.listaCompra = compras;
      this.existeListaActiva = this.listaCompra.length > 0;
    });
  }

  onCompradoChange(compra: Compra) {
    this.appService.updateCompra(compra).subscribe();
  }

  
  onCheckAutoChange() {
    this.listaCompra.forEach((producto) => {
      producto.seleccionado = this.checkAuto;
      this.appService.updateCompra(producto).subscribe();
    });
  }


  onCrearCompra() {
    if (this.existeListaActiva) {
      alert("Ya existe una lista de compras creada.");
    } else {
      const dialogRef = this.dialog.open(CrearEditarCompraComponent, {
        width: '400px',
        data: {}
      });

      dialogRef.afterClosed().subscribe((comprasActualizadas: Compra[]) => {
        if (comprasActualizadas) {
          this.listaCompra = comprasActualizadas;
          this.existeListaActiva = this.listaCompra.length > 0;
        }
      });
    }
  }

  onEditarCompra() {
    if (this.listaCompra && this.listaCompra.length > 0) {
      const dialogRef = this.dialog.open(CrearEditarCompraComponent, {
        width: '400px',
        data: {
          listaCompra: [...this.listaCompra],
          edit: true
        }
      });
  
      dialogRef.afterClosed().subscribe((comprasActualizadas: Compra[]) => {
        if (comprasActualizadas) {
          this.cargarCompras();
        }
      });
    } else {
      alert("No hay ninguna lista de compras creada para editar.");
    }
  }
  


  onBorrarClick() {
    const productosSeleccionados = this.listaCompra.filter(compra => compra.seleccionado);

    if (productosSeleccionados.length > 0) {
      const dialogRef = this.dialog.open(BorrarCompraComponent, {
        width: '400px',
        data: { productos: productosSeleccionados }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          productosSeleccionados.forEach(compra => {
            this.appService.deleteCompra(compra.id).subscribe(() => {
            });
          });
          this.cargarCompras();
        }
      });
    } else {
      alert("Por favor, seleccione al menos un elemento para borrar.");
    }
  }


  onConfirmarCompraClick() {
    const productosSeleccionados = this.listaCompra.filter(compra => compra.seleccionado);
  
    if (productosSeleccionados.length === 0) {
      alert("No hay productos seleccionados para confirmar.");
      return;
    }
  
    const dialogRef = this.dialog.open(ConfirmarCompraComponent, {
      width: '400px',
      data: productosSeleccionados,
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        productosSeleccionados.forEach(compra => {
          this.appService.sumarStock(compra.id_producto, compra.cantidad_comprar).subscribe();
          
          this.appService.deleteCompra(compra.id).subscribe();
        });

        this.cargarCompras();
      }
    });
  }
  
}

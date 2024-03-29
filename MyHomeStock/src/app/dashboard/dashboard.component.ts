import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertBorrarComponent } from './borrar-dashboard/alert-borrar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productos: Producto[] = [];
  cantidadRestar: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  cantidadSeleccionada: { [key: number]: number } = {};

  constructor(
    private appService: AppService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.appService.getProductos().subscribe((productos) => {
      this.productos = productos;

      this.productos.forEach(producto => {
        this.cantidadSeleccionada[producto.id] = 1;
      });
    });
  }

  cambiarCantidadRestar(producto: Producto, event: any): void {
    const cantidadCambiar = event.target.value;
    this.cantidadSeleccionada[producto.id] = parseInt(cantidadCambiar, 10);
  }

  restarStock(producto: Producto, cantidadSeleccionada: number): void {
    if (cantidadSeleccionada > 0 && producto.cantidad_stock != null && producto.cantidad_stock >= cantidadSeleccionada) {
      const dialogRef: MatDialogRef<AlertBorrarComponent> = this.dialog.open(AlertBorrarComponent, {
        width: '400px',
        data: { productName: producto.nombre_producto }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.appService.restarStock(producto.id, cantidadSeleccionada).subscribe(result => {
            if (result) {
              producto.cantidad_stock = result.cantidad_stock;
            } else {
              console.log('Error al restar el stock del producto. Producto no encontrado o cantidad insuficiente');
            }
          });
        }
      });
    } else {
      console.log('Operación no permitida: cantidad seleccionada inválida o stock no disponible.');
    }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertBorrarComponent } from './borrar-dashboard/alert-borrar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productos: Producto[] = [];
  cantidadRestar: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  cantidadSeleccionada: { [key: number]: number } = {};

  constructor (
    private appService: AppService, 
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if(!isLogin)
        this.router.navigate(['/login']);
      this.cargarProductos();
    });
  }

  cargarProductos(): void {
    this.appService.getProductos().subscribe((productos) => {
      this.productos = productos.filter(prod => prod.cantidad_stock > 0 || prod.favorito);
      this.productos.forEach(p => {
        this.cantidadSeleccionada[p.id] = 1;
        if (p.cantidad_stock === null) {
          p.cantidad_stock = 0;
        }
      });
    });
  }

  cambiarCantidadRestar(producto: Producto, event: any): void {
    const cantidad = parseInt(event.target.value, 10);
    this.cantidadSeleccionada[producto.id] = cantidad;
  }

  restarStock(producto: Producto): void {
    const cantidadARestar = -Math.abs(this.cantidadSeleccionada[producto.id]);
    if (-cantidadARestar <= producto.cantidad_stock) {
      const dialogRef = this.dialog.open(AlertBorrarComponent, {
        width: '400px',
        data: { productName: producto.nombre }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.appService.ajustarStock(producto.id, cantidadARestar).subscribe(() => {
            producto.cantidad_stock += cantidadARestar;
          }, error => {
            console.error('Error al ajustar el stock del producto:', error);
          });
        }
      });
    } else {
      console.error('Operación no permitida: cantidad seleccionada inválida o stock insuficiente.');
    }
  }

}

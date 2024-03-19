import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { EditarStockComponent } from './editar-stock/editar-stock.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-stock-producto',
  templateUrl: './stock-producto.component.html',
  styleUrls: ['./stock-producto.component.css']
})
export class StockProductoComponent implements OnInit {
  productos: Producto[] = [];
  
  constructor(
    private appService: AppService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.appService.getProductos().subscribe((productos) => {
      this.productos = productos.filter((producto) => {
        return producto.favorito || producto.cantidad_stock > 0;
      });
    });
  }

  onUpdateStockClick(producto: Producto): void {
    const dialogRef: MatDialogRef<EditarStockComponent> = this.dialog.open(EditarStockComponent, {
      width: '400px',
      data: { producto } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appService.updateProducto(result).subscribe(updatedProduct => {
          if (updatedProduct) {
            this.obtenerProductos();
          } else {
            console.log('Error al editar el producto.');
          }
        });
      }
    });
  }
}

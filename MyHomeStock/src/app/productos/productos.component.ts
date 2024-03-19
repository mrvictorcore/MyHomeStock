import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Producto } from '../models/producto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../models/categoria';
import { Tipo } from '../models/tipo';
import { Descripcion } from '../models/descripcion';
import { AlertBorrarProductoComponent } from './borrar-producto/alert-borrar-producto.component';
import { EditarCrearProductoComponent } from './crear-editar-producto/editar-crear-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  categoria: Categoria[] | undefined;
  tipo: Tipo[] | undefined;
  descripcion: Descripcion[] | undefined;

  nombresCategorias: { [key: number]: string } = {};
  nombresTipos: { [key: number]: string } = {};
  nombresDescripciones: { [key: number]: string } = {};

  constructor(
    private appService: AppService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {

    this.obtenerProductos();
    
    this.appService.getCategorias().subscribe(categorias => {
        this.categoria = categorias;
        this.categoria.forEach(categorias => {
        this.nombresCategorias[categorias.ID] = categorias.Nombre_categoria;
      });
    });

      this.appService.getTipos().subscribe(tipos => {
        this.tipo = tipos;
        this.tipo.forEach(tipos => {
        this.nombresTipos[tipos.ID] = tipos.Nombre_tipo;
      });
    });

    this.appService.getDescripciones().subscribe(descripciones => {
      this.descripcion = descripciones;
      this.descripcion.forEach(descripciones => {
        this.nombresDescripciones[descripciones.ID] = descripciones.Nombre_descripcion;
      });
    });
  }

  obtenerProductos(): void {
    this.appService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  onBorrarClick(producto: Producto): void {
    const dialogRef: MatDialogRef<AlertBorrarProductoComponent> = this.dialog.open(AlertBorrarProductoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.appService.deleteProducto(producto.id).subscribe(() => {
          this.productos = this.productos.filter(p => p.id !== producto.id);
        }, error => {
          console.log('Error al eliminar el producto: ', error);
        });
      }
    });
  }

  onEditarClick(producto: Producto): void {
    const dialogRef: MatDialogRef<EditarCrearProductoComponent> = this.dialog.open(EditarCrearProductoComponent, {
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

  onCrearProductoClick(): void {
    const nuevoProducto: Producto = {
      id: 0, 
      nombre_producto: '', 
      id_categoria: 0, 
      id_tipo: 0, 
      id_descripcion: 0, 
      cantidad_stock: 0, 
      cantidad_min: 0,
      favorito: false,
      cantidad_comprar: 0,
      seleccionado: false
    };

    const dialogRef: MatDialogRef<EditarCrearProductoComponent> = this.dialog.open(EditarCrearProductoComponent, {
      width: '400px',
      data: { producto: nuevoProducto, isNew: true } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'object') {
        this.appService.addProductos(result).subscribe(newProduct => {
          if (newProduct) {
            this.obtenerProductos();
          } else {
            console.log('Error al crear el producto.');
          }
        });
      }
    });
  }

  onFavoritosClick(producto: Producto): void {
    producto.favorito = !producto.favorito;
  
    this.appService.updateProducto(producto).subscribe(updatedProduct => {
      if (updatedProduct) {
        this.obtenerProductos();
      } else {
        console.log('Error al actualizar el producto.');
      }
    });
  }
  

}

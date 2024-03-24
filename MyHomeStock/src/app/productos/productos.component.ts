import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Producto } from '../models/producto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../models/categoria';
import { Tipo } from '../models/tipo';
import { Descripcion } from '../models/descripcion';
import { EditarCrearProductoComponent } from './crear-editar-producto/editar-crear-producto.component';
import { AlertBorrarProductoComponent } from './borrar-producto/alert-borrar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  tipos: Tipo[] = [];
  descripciones: Descripcion[] = [];

  nombresCategorias: { [key: number]: string } = {};
  nombresTipos: { [key: number]: string } = {};
  nombresDescripciones: { [key: number]: string } = {};

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerTipos();
    this.obtenerDescripciones();
  }

  obtenerProductos(): void {
    this.appService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (error) => {
        console.error('Error al obtener los productos: ', error);
      }
    });
  }

  obtenerCategorias(): void {
    this.appService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      categorias.forEach(cat => {
        this.nombresCategorias[cat.ID] = cat.Nombre_categoria;
      });
    });
  }

  obtenerTipos(): void {
    this.appService.getTipos().subscribe((tipos:any) => {
      this.tipos = tipos && tipos["code"] ? new Array() : tipos;
      this.tipos.forEach((tipo:any) => {
        this.nombresTipos[tipo.ID] = tipo.Nombre_tipo;
      });
    });
  }

  obtenerDescripciones(): void {
    this.appService.getDescripciones().subscribe(descripciones => {
      this.descripciones = descripciones;
      descripciones.forEach(desc => {
        this.nombresDescripciones[desc.ID] = desc.Nombre_descripcion;
      });
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

  onBorrarClick(producto: Producto): void {
    const dialogRef = this.dialog.open(AlertBorrarProductoComponent, {
      width: '400px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.appService.deleteProducto(producto.id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== producto.id);
          },
          error: (error) => {
            console.error('Error al eliminar el producto: ', error);
          }
        });
      }
    });
  }

  onEditarClick(producto: Producto): void {
    const dialogRef = this.dialog.open(EditarCrearProductoComponent, {
      width: '400px',
      data: { producto }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appService.updateProducto(result).subscribe({
          next: (updatedProducto) => {
            const index = this.productos.findIndex(p => p.id === updatedProducto.id);
            if (index !== -1) {
              this.productos[index] = updatedProducto;
            }
          },
          error: (error) => {
            console.error('Error al editar el producto: ', error);
          }
        });
      }
    });
  }

  onFavoritosClick(producto: Producto): void {
    this.appService.toggleFavoritoProducto(producto.id).subscribe(() => {
      const index = this.productos.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.productos[index].favorito = !this.productos[index].favorito;
      }
    }, error => {
      console.log('Error al actualizar el estado de favoritos del producto: ', error);
    });
  }
}

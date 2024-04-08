import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Producto } from '../models/producto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../models/categoria';
import { TipoCategoria } from '../models/tipo_categoria';
import { EditarCrearProductoComponent } from './crear-editar-producto/editar-crear-producto.component';
import { AlertBorrarProductoComponent } from './borrar-producto/alert-borrar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  categorias: Categoria[] = [];
  tipos_categoria: TipoCategoria[] = [];

  nombresCategorias: { [key: number]: string } = {};
  nombresTipos: { [key: number]: string } = {};

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.appService.getTiposCategorias().subscribe(tipos => {
      this.tipos_categoria = tipos;
      this.appService.getCategorias().subscribe(categorias => {
        this.categorias = categorias;
        this.obtenerProductos();
      });
    });
  }

  obtenerProductos(): void {
    this.appService.getProductos().subscribe(productos => {
      this.productos = productos.map(producto => {
        const categoria = this.categorias.find(c => c.id === producto.id_categoria);
        const tipoCategoria = categoria ? this.tipos_categoria.find(t => t.id === +categoria.id_tipo) : null;
        return {
          ...producto,
          nombreCategoria: categoria ? categoria.nombre : 'Desconocida',
          nombreTipoCategoria: tipoCategoria ? tipoCategoria.nombre : 'Desconocido'
        };
      });
    });
  }


 onCrearProductoClick(): void {
    const nuevoProducto: Producto = {
      id: 0, 
      id_categoria: 0, 
      id_usuario: 1, 
      nombre: '', 
      descripcion: '', 
      cantidad_stock: 0, 
      cantidad_min_mensual: 0,
      favorito: false,
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
        console.log('Actualizando producto con ID:', producto.id);
        this.obtenerProductos();
      } else {
        console.log('Actualizando producto con ID:', producto.id, result);
        console.log('No se proporcionó un producto válido para actualizar.');
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

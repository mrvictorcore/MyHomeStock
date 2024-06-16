import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from '../models/categoria';
import { TipoCategoria } from '../models/tipo_categoria';
import { EditarCrearProductoComponent } from './crear-editar-producto/editar-crear-producto.component';
import { AlertBorrarProductoComponent } from './borrar-producto/alert-borrar-producto.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  categorias: Categoria[] = [];
  tipos_categoria: TipoCategoria[] = [];

  nombresCategorias: { [key: number]: string } = {};
  nombresTipos: { [key: number]: string } = {};

  constructor(
    private appService: AppService,
    private productoService: ProductoService, 
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      productos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  get productosArray(): FormArray {
    return this.formGroup.get('productos') as FormArray;
  }

  cargarDatos() {
    this.productoService.getAllProductos().subscribe({
      next: (productos: Producto[]) => {
        this.cargarProductos(productos);
      },
      error: (err) => {
        console.error('Error al obtener productos: ', err);
        // this.router.navigate(['/login']);
      }
    });

    // Faltan los servicios para obtener categorias y tipos
    this.appService.getCategorias().subscribe(categorias => this.categorias = categorias);
    this.appService.getTiposCategorias().subscribe(tipos_categoria => this.tipos_categoria = tipos_categoria);
  }

  cargarProductos(productos: Producto[]) {
    this.productosArray.clear();
    productos.forEach((p) => {
      const categoria = this.categorias.find(c => c.id === p.id_categoria);
      const tipoCategoria = categoria ? this.tipos_categoria.find(t => t.id === +categoria.id_tipo) : null;

      this.productosArray.push(this.fb.group({
        id: [p.id],
        nombre: [p.nombre],
        nombreTipoCategoria: [tipoCategoria ? tipoCategoria.nombre : 'Desconocido'],
        nombreCategoria: [categoria ? categoria.nombre : 'Desconocido'],
        descripcion: [p.descripcion],
        favorito: [p.favorito]
      }));
    });
  }

  onCrearProductoClick() {
    const nuevoProducto: Producto = {
      id: 0, 
      id_categoria: 0, 
      id_usuario: this.authService.getCurrentUser()?.id || 0, 
      nombre: '', 
      descripcion: '', 
      cantidad_stock: 0, 
      cantidad_min_mensual: 0,
      favorito: false,
    };

    const dialogRef = this.dialog.open(EditarCrearProductoComponent, {
      width: '400px',
      data: { producto: nuevoProducto, isNew: true } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.createProducto(result).subscribe({
          next: (newProduct: Producto[]) => {
            console.log(newProduct);
            this.cargarDatos();
          },
          error: (err) => {
            console.error('Error al crear el producto: ', err)
          }
        });
      }
    });
  }

  onBorrarClick(index: number) {
    const productoForm = this.productosArray.at(index) as FormGroup;

    const dialogRef = this.dialog.open(AlertBorrarProductoComponent, {
      width: '400px',
      data: { producto: productoForm.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.deleteProducto(productoForm.value.id).subscribe({
          next: () => {
            this.productosArray.removeAt(index);
          },
          error: (err) => {
            console.error('Error al eliminar el producto: ', err);
          }
        });
      }
    });
  }

  onEditarClick(index: number) {
    const productoForm = this.productosArray.at(index) as FormGroup;

    const dialogRef = this.dialog.open(EditarCrearProductoComponent, {
      width: '400px',
      data: { producto: productoForm.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.updateProducto(result).subscribe({
          next: () => {
            this.productosArray.at(index).patchValue(result);
          },
          error: (err) => {
            console.error('Error al actualizar el producto: ', err);
          }
        });
      }  
    });
  }

  onFavoritosClick(index: number) {
    const productoForm = this.productosArray.at(index) as FormGroup;

    this.productoService.toggleFavorito(productoForm.value).subscribe({
      next: () => {
        const favorito = !productoForm.value.favorito;
        productoForm.patchValue({ favorito });
      },
      error: (err) => {
        console.error('Error al actualizar el estado de favorito: ', err);
      }
    });
  }
}

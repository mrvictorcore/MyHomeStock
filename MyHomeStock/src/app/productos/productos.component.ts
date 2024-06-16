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
import { CategoriaService } from '../services/categoria.service';
import { TipoCategoriaService } from '../services/tipo-categoria.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  categorias: Categoria[] = [];
  tipos_categoria: TipoCategoria[] = [];

  constructor(
    private productoService: ProductoService, 
    private categoriaService: CategoriaService,
    private tipoCategoriaService: TipoCategoriaService,
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
    forkJoin([
      this.categoriaService.getAllCategorias(),
      this.tipoCategoriaService.getAllTipoCategorias(),
      this.productoService.getAllProductos()
    ]).subscribe({
      next: ([categorias, tipos_categoria, productos]) => {
        this.categorias = categorias;
        this.tipos_categoria = tipos_categoria;
        this.cargarProductos(productos);
      },
      error: (err) => {
        console.error('Error al obtener datos: ', err);
      }
    });
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
    const idProducto = productoForm.value.id;

    this.productoService.toggleFavorito(idProducto).subscribe({
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

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { TipoCategoria } from '../../models/tipo_categoria';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoService } from '../../services/producto.service';
import { TipoCategoriaService } from '../../services/tipo-categoria.service';

@Component({
  selector: 'app-editar-crear-producto',
  templateUrl: './editar-crear-producto.component.html',
  styleUrls: ['./editar-crear-producto.component.css']
})
export class EditarCrearProductoComponent implements OnInit {
  isNew: boolean;
  productoForm: FormGroup = this.fb.group({});
  categorias: Categoria[] = [];
  tipos: TipoCategoria[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditarCrearProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto, isNew: boolean },
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private tipoCategoriaService: TipoCategoriaService,
    private productoService: ProductoService
  ) {
    this.isNew = data.isNew;
    this.productoForm = this.fb.group({
      id: [data.producto.id],
      nombre: [data.producto.nombre, Validators.required],
      id_categoria: [data.producto.id_categoria, Validators.required],
      descripcion: [data.producto.descripcion, Validators.required],
      cantidad_stock: [data.producto.cantidad_stock ?? 0, [Validators.required, Validators.min(0)]],
      cantidad_min_mensual: [data.producto.cantidad_min_mensual ?? 0, [Validators.required, Validators.min(0)]],
      favorito: [data.producto.favorito]
    });
  }

  ngOnInit(): void {
    this.categoriaService.getAllCategorias().subscribe({
      next: (categorias: Categoria[]) => this.categorias = categorias,
      error: (err) => console.error('Error al obtener categorías: ', err)
    });

    this.tipoCategoriaService.getAllTipoCategorias().subscribe({
      next: (tipos: TipoCategoria[]) => this.tipos = tipos,
      error: (err) => console.error('Error al obtener tipos de categorías: ', err)
    });
  }

  guardarCrearProducto(): void {
    if (this.productoForm.invalid) return;

    const producto = this.productoForm.value as Producto;

    if (this.isNew) {
      this.productoService.createProducto(producto).subscribe({
        next: (newProducto: Producto[]) => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al crear el producto: ', err);
          this.dialogRef.close(false);
        }
      });
    } else {
      this.productoService.updateProducto(producto).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar el producto: ', err);
          this.dialogRef.close(false);
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}

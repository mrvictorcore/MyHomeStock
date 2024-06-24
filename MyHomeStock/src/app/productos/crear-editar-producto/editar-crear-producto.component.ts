import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { TipoCategoria } from '../../models/tipo_categoria';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-editar-crear-producto',
  templateUrl: './editar-crear-producto.component.html',
  styleUrls: ['./editar-crear-producto.component.css']
})
export class EditarCrearProductoComponent implements OnInit {
  isNew: boolean;
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  tipos: TipoCategoria[] = [];
  selectedCategoria: Categoria | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditarCrearProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto, isNew: boolean },
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
  ) {
    this.isNew = data?.isNew ?? true;

    this.productoForm = this.fb.group({
      id: [data?.producto?.id ?? null],
      nombre: [data?.producto?.nombre ?? '', Validators.required],
      id_categoria: [data?.producto?.id_categoria ?? null, Validators.required],
      descripcion: [data?.producto?.descripcion ?? '', Validators.required],
      cantidad_stock: [data?.producto?.cantidad_stock ?? 0, [Validators.required, Validators.min(0)]],
      cantidad_min_mensual: [data?.producto?.cantidad_min_mensual ?? 0, [Validators.required, Validators.min(0)]],
      favorito: [data?.producto?.favorito ?? false]
    });
  }

  ngOnInit(): void {
    this.categoriaService.getAllCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.selectedCategoria = this.categorias.find(c => c.id === this.productoForm.value.id_categoria) || null;
    });

    this.setInitialFormValues();
  }

  setInitialFormValues() {
    const producto = this.data?.producto ?? {};
    this.productoForm.patchValue({
      cantidad_stock: producto.cantidad_stock ?? 0,
      cantidad_min_mensual: producto.cantidad_min_mensual ?? 0,
      id_categoria: producto.id_categoria ?? null
    });
  }

  guardarCrearProducto() {
    if (this.productoForm.invalid) {
      return;
    }

    const productoData = this.productoForm.value;

    if (this.isNew) {
      this.productoService.createProducto(productoData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error al crear el producto:', err);
          this.dialogRef.close(false);
        }
      });
    } else {
      this.productoService.updateProducto(productoData.id, productoData).subscribe({
        next: (response) => {
          this.dialogRef.close(productoData);
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          this.dialogRef.close(false);
        }
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
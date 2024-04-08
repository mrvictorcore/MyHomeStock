import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../models/producto';
import { AppService } from '../../app.service';
import { Categoria } from '../../models/categoria';
import { TipoCategoria } from '../../models/tipo_categoria';

@Component({
  selector: 'app-editar-crear-producto',
  templateUrl: './editar-crear-producto.component.html',
  styleUrls: ['./editar-crear-producto.component.css']
})
export class EditarCrearProductoComponent implements OnInit {
  isNew: boolean;
  productoOriginal: Producto;
  productoTemp: Producto;
  categorias: Categoria[] | undefined;
  tipos: TipoCategoria[] | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditarCrearProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto, isNew: boolean },
    private appService: AppService
  ) {
    this.productoOriginal = data.producto;
    // Copia el producto original en una variable temporal
    this.productoTemp = { ...data.producto };
    this.isNew = data.isNew;
  }

  ngOnInit(): void {
    this.appService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    this.appService.getTiposCategorias().subscribe(tipos => {
      this.tipos = tipos;
    });
  }

  guardarCrearProducto(): void {
    if (this.isNew) {
      this.appService.addProductos(this.productoTemp).subscribe(newProducto => {
        if (newProducto) {
          this.dialogRef.close(true);
        } else {
          console.log('Error al crear el producto.');
          this.dialogRef.close(false);
        }
      });
    } else {
      this.appService.updateProducto(this.productoTemp).subscribe(updatedProducto => {
        if (updatedProducto) {
          this.productoOriginal = { ...this.productoTemp };
          this.dialogRef.close(true);
        } else {
          console.log('Error al actualizar el producto.');
          this.dialogRef.close(false);
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}

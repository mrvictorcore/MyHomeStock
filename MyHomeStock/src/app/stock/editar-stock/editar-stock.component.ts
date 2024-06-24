import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent {
  productoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto },
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      id: [data.producto.id],
      nombre: [data.producto.nombre, Validators.required],
      cantidad_stock: [data.producto.cantidad_stock, [Validators.required, Validators.min(0)]],
      cantidad_min_mensual: [data.producto.cantidad_min_mensual, [Validators.required, Validators.min(0)]],
    });
  }

  onSaveClick(): void {
    if (this.productoForm.valid) {
      this.dialogRef.close(this.productoForm.value);
    } else {
      console.log('El formulario no es válido');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
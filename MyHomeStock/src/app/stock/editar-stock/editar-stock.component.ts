import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent {
  producto: Producto;

  constructor(
    public dialogRef: MatDialogRef<EditarStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto }
  ) {
    this.producto = { ...data.producto };
  }

  onSaveClick(): void {
    if (this.producto.cantidad_stock >= 0 && this.producto.cantidad_min_mensual >= 0) {
      this.dialogRef.close(this.producto);
    } else {
      console.log('Los valores de stock no pueden ser negativos.');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}


import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-borrar-producto',
  templateUrl: './alert-borrar-producto.component.html',
  styleUrls: ['./alert-borrar-producto.component.css']
})
export class AlertBorrarProductoComponent {

  constructor(
    private dialogRef: MatDialogRef<AlertBorrarProductoComponent>
  ) { }

  onCancelarClick(): void {
    this.dialogRef.close(false); 
  }

  onConfirmarClick(): void {
    this.dialogRef.close(true);
  }

}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css']
})
export class ConfirmarCompraComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmarCompraComponent>
  ) { }

  onConfirmarClick() {
    this.dialogRef.close(true);
  }

  onCancelarClick() {
    this.dialogRef.close(false);
  }
}

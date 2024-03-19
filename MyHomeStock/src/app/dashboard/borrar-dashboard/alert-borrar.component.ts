import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-borrar',
  templateUrl: './alert-borrar.component.html',
  styleUrl: './alert-borrar.component.css'
})
export class AlertBorrarComponent {

  constructor(
    private dialogRef: MatDialogRef<AlertBorrarComponent>
  ) { }

  cancelar(): void {
    this.dialogRef.close(false); 
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

}

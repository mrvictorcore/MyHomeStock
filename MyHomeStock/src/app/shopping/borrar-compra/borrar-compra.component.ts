import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-compra',
  standalone: true,
  imports: [],
  templateUrl: './borrar-compra.component.html',
  styleUrl: './borrar-compra.component.css'
})
export class BorrarCompraComponent {

  constructor(
    private dialogRef: MatDialogRef<BorrarCompraComponent>
  ){}

  onCancelarClick(): void {
    this.dialogRef.close(false); 
  }

  onConfirmarClick(): void {
    this.dialogRef.close(true);
  }

}

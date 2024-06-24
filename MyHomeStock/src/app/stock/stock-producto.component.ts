import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { EditarStockComponent } from './editar-stock/editar-stock.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stock-producto',
  templateUrl: './stock-producto.component.html',
  styleUrls: ['./stock-producto.component.css']
})
export class StockProductoComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    productos: this.fb.array([])
  });

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  get productosArray(): FormArray {
    return this.formGroup.get('productos') as FormArray;
  }

  obtenerProductos() {
    const currentUser = this.authService.getCurrentUser();
    console.log('Usuario autenticado:', currentUser);
    if (currentUser && currentUser.id) {
      this.productoService.getFavoritesOrStock(currentUser.id).subscribe({
        next: (productos) => {
          this.productosArray.clear();
          productos.forEach(producto => {
            this.productosArray.push(this.fb.group({
              id: [producto.id],
              nombre: [producto.nombre],
              cantidad_stock: [producto.cantidad_stock ?? 0],
              cantidad_min_mensual: [producto.cantidad_min_mensual ?? 0],
            }));
          });
        },
        error: (err) => {
          console.error('Error al obtener productos filtrados:', err);
        }
      });
    } else {
      console.error('Usuario no autenticado');
    }
  }

  onUpdateStockClick(index: number): void {
    const productoForm = this.productosArray.at(index) as FormGroup;
    const producto = productoForm.value;

    const dialogRef = this.dialog.open(EditarStockComponent, {
      width: '400px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.updateStock(result.id, result.cantidad_stock, result.cantidad_min_mensual).subscribe({
          next: (updatedProduct) => {
            this.productosArray.at(index).patchValue(updatedProduct);
            console.log('Stock actualizado con éxito');
          },
          error: (err) => {
            console.error('Error al actualizar el stock:', err);
          }
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { MatDialog } from '@angular/material/dialog';
import { AlertBorrarComponent } from './borrar-dashboard/alert-borrar.component';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  cantidadRestar: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      productos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      if (user && user.id) {
        this.productoService.getFavoritesOrStock(user.id).subscribe({
          next: (productos: Producto[]) => {
            this.cargarProductos(productos);
          },
          error: (err) => {
            console.error('Error en la busqueda de productos del usuario', err);
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  get productosArray(): FormArray {
    return this.formGroup.get('productos') as FormArray;
  }

  cargarProductos(productos: Producto[]): void {
    this.productosArray.clear();
    productos.forEach((p) => {
      this.productosArray.push(this.fb.group({
        id: [p.id],
        nombre: [p.nombre],
        cantidad_stock: [p.cantidad_stock],
        cantidad_seleccionada: [1, [Validators.required, Validators.min(1)]]
      }));
    });
  }

  restarStock(index: number) {
    const productoForm = this.productosArray.at(index) as FormGroup;
    const idProducto = Number(productoForm.value.id);
    const cantidadARestar = Number(productoForm.value.cantidad_seleccionada);

    const dialogRef = this.dialog.open(AlertBorrarComponent, {
      width: '400px',
      data: { productName: productoForm.value.nombre }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productoService.ajustarStockRestar(idProducto, cantidadARestar).subscribe({
          next: () => {
            const user = this.authService.getCurrentUser();
            if (user && user.id) {
              this.productoService.getFavoritesOrStock(user.id).subscribe({
                next: (productos) => {
                  this.cargarProductos(productos);
                },
                error: (err) => {
                  console.error('Error fetching products for user:', err);
                }
              });
            }
          },
          error: (error) => {
            console.error('Error al ajustar el stock del producto:', error);
          }
        });
      }
    });
  }
}

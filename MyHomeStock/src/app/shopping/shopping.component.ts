import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { CompraProducto } from '../models/compra_producto';
import { CrearEditarCompraComponent } from './crear-editar-compra/crear-editar-compra.component';
import { Compra } from '../models/compra';
import { ConfirmarCompraComponent } from './confirmar-compra/confirmar-compra.component';
import { Observable, catchError, forkJoin, of } from 'rxjs';
import { ComprasUpdateService } from '../compras-update.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  id_usuario: number = 1;

  listaCompra: Compra[] = [];
  listaCompraSeleccionada: number = 1;

  productosComprar: CompraProducto[] = [];
  productosFiltradosListaCompra: CompraProducto[] = [];
  todosSeleccionados: boolean = false;
  cantidadRestar: number[] = [];
  cantidadSeleccionada: { [key: number]: number } = {};

  constructor(
    private appService: AppService, 
    private dialog: MatDialog,
    private comprasUpdate: ComprasUpdateService
  ) {}

  ngOnInit(): void {
    this.cargarProductosListaCompra();
    this.actualizacionesCompra();
  }

  actualizacionesCompra(): void {
    this.comprasUpdate.compraActualizada$.subscribe(() => {
      this.cargarProductosListaCompra();
    });
  }

  cargarProductosListaCompra(): void {
    this.appService.getCompraProductos().subscribe((productos) => {
      this.productosComprar = productos;
      this.filtrarProductosPorCompraSeleccionada();
  
      this.productosComprar.forEach(producto => {
        this.cantidadSeleccionada[producto.id] = producto.cantidad;
      });
    });

    this.appService.getCompras().subscribe((compra) => {
      this.listaCompra = compra;
    });
  }

  filtrarProductosPorCompraSeleccionada(): void {
    if (!this.listaCompraSeleccionada) {
      this.productosFiltradosListaCompra = this.productosComprar.filter(producto => producto.id_compra === 1);
      return;
    }
    this.productosFiltradosListaCompra = this.productosComprar.filter(producto => producto.id_compra === this.listaCompraSeleccionada);
  }

  generarRangoCantidadRestar(producto: CompraProducto): number[] {
    const cantidadRestar = [];
    for (let i = producto.cantidad; i >= 1; i--) {
      cantidadRestar.push(i);
    }
    return cantidadRestar;
  }

  seleccionarTodos(): void {
    this.productosFiltradosListaCompra.forEach((producto) => {
      producto.seleccionado = this.todosSeleccionados;
      console.log(producto.seleccionado);
    });
  }

  cambiarCantidadRestar(producto: CompraProducto, event: any): void {
    this.cantidadSeleccionada[producto.id] = parseInt(event.target.value, 10);
  }

  actualizarStock(): Observable<any> {
    const operaciones = this.productosFiltradosListaCompra.filter(p => p.seleccionado).map(p => {
      const ajusteStock$ = this.appService.ajustarStock(p.id_producto, this.cantidadSeleccionada[p.id]).pipe(
        catchError(err => {
          console.error('Error al ajustar el stock: ', err);
          return of(null);
        })
      );

      const compraProductoActualizado: CompraProducto = {
        id: p.id,
        id_compra: p.id_compra,
        id_producto: p.id_producto,
        cantidad: p.cantidad - this.cantidadSeleccionada[p.id],
        seleccionado: p.seleccionado
      };

      const actualizarCompraProducto$ = this.appService.updateCompraProducto(compraProductoActualizado).pipe(
        catchError(err => {
          console.error('Error al actualizar CompraProducto: ', err );
          return of(null);
        })
      );

      return forkJoin([ajusteStock$, actualizarCompraProducto$]);
    });

    return forkJoin(operaciones);
  }
  
  onCrearCompra(): void {
    const nuevaCompra: Compra = {
      id: 0,
      id_usuario: this.id_usuario,
      descripcion: '',
    };
    
    const dialogRef = this.dialog.open(CrearEditarCompraComponent, {
      width: '400px',
      data: { edit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarProductosListaCompra();
      }
    });
  }

  onEditarCompra(): void {
    const compraSeleccionada = this.listaCompra.find(compra => compra.id === this.listaCompraSeleccionada);

    if (compraSeleccionada) {
      const dialogRef = this.dialog.open(CrearEditarCompraComponent, {
        width: '400px',
        data: { edit: true, listaCompra: compraSeleccionada, id: compraSeleccionada.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cargarProductosListaCompra();
        }
      });
    } else {
      console.error('Compra seleccionada no encontrada');
    }
  }

  onConfirmarClick(): void {
    const dialogRef = this.dialog.open(ConfirmarCompraComponent, {
      width: '400px',
      data: { edit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actualizarStock().subscribe(() =>{
          this.comprobarProductosACero();
        });
        this.verificarYBorrarListaCompraSiEstaVacia();
        this.cargarProductosListaCompra();
      }
    });
  }

  onBorrarClick(): void {
    const compraId = this.listaCompraSeleccionada;
    
    if (!compraId) {
      console.error('No hay una compra seleccionada para borrar');
      return;
    }
    
    if (!confirm('¿Estás seguro de querer borrar esta compra y todos sus productos?')) {
      return;
    }

    const productosABorrar = this.productosComprar.filter(p => p.id_compra === compraId);
    
    if (productosABorrar.length > 0) {
      const operacionesBorradoProductos = productosABorrar.map(producto => 
        this.appService.deleteCompraProducto(producto.id));

      forkJoin(operacionesBorradoProductos).subscribe({
        next: () => this.borrarCompra(compraId),
        error: err => console.error('Error al borrar productos de la compra:', err),
      });
    } else {
      this.borrarCompra(compraId);
    }
  }

  comprobarProductosACero(): void {
    const productosABorrar = this.productosComprar.filter(producto => producto.cantidad === 0);
  
    if (productosABorrar.length > 0) {
      const operacionesBorrado = productosABorrar.map(producto =>
        this.appService.deleteCompraProducto(producto.id)
      );
  
      forkJoin(operacionesBorrado).subscribe({
        next: () => {
          console.log('Productos con cantidad 0 borrados');
          this.cargarProductosListaCompra();
          this.verificarYBorrarListaCompraSiEstaVacia();
        },
        error: (err) => console.error('Error al borrar productos:', err)
      });
    } else {
      this.verificarYBorrarListaCompraSiEstaVacia();
    }
  }

  verificarYBorrarListaCompraSiEstaVacia(): void {
    const productosDeLaListaSeleccionada = this.productosComprar.filter(producto => producto.id_compra === this.listaCompraSeleccionada);
    
    if (productosDeLaListaSeleccionada.length === 0) {
      this.borrarCompra(this.listaCompraSeleccionada);
    } else {
      this.cargarProductosListaCompra();
      console.log('La lista de compra seleccionada aún tiene productos.');
    }
  }

  borrarCompra(compraId: number): void {
    this.appService.deleteCompra(compraId).subscribe({
      next: () => {
        console.log('Compra borrada con éxito');
        this.comprasUpdate.notificarCompraActualizada();
        this.cargarProductosListaCompra();
      },
      error: (err) => console.error('Error al borrar la compra:', err),
    });
  }
}

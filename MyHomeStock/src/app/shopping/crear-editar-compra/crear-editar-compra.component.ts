import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Producto } from '../../models/producto';
import { Compra } from '../../models/compra';
import { CompraProducto } from '../../models/compra_producto';
import { Observable, catchError, forkJoin, of } from 'rxjs';
import { ComprasUpdateService } from '../../compras-update.service';

@Component({
  selector: 'app-crear-editar-compra',
  templateUrl: './crear-editar-compra.component.html',
  styleUrls: ['./crear-editar-compra.component.css']
})
export class CrearEditarCompraComponent implements OnInit {
  editMode: boolean = false;

  id_usuario: number = 1;

  productosDisponibles: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  productoSeleccionadoId: number | null = -1;

  productosCompraSeleccionada: CompraProducto[] = [];
  compraProductosTemporales: CompraProducto[] = [];
  todosLosCompraProductos: CompraProducto[] = [];
  idsProductosEliminados: number[] = [];
  cantidadComprarCompraProducto: number = 1;
  cantidadesOriginales: { [key: number]: number } = {};
  cantidadSeleccionada: { [key: number]: number } = {};

  listasCompra: Compra[] = [];
  listaCompraSeleccionada: Compra | null = null;
  listaCompraSeleccionadaId: any = -1;
  nuevaDescripcionLista: string = '';
  descripcionOriginal: string = '';

  constructor(
    public dialogRef: MatDialogRef<CrearEditarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService,
    private comprasUpdate: ComprasUpdateService
  ) {}

  ngOnInit(): void {
    this.cargarListasCompras();
    this.cargarProductos();

    this.editMode = this.data.edit;

    this.listaCompraSeleccionada = this.data.listaCompra;
    this.listaCompraSeleccionadaId = this.data.id;

    if (this.editMode && this.listaCompraSeleccionada) {
      this.nuevaDescripcionLista = this.listaCompraSeleccionada.descripcion;
    }

    if (this.listaCompraSeleccionadaId) {
      this.cargarProductosDeCompra(this.listaCompraSeleccionadaId);
    }
  }

  cargarProductos(): void {
    this.appService.getProductos().subscribe(
      productos => {
        this.productosDisponibles = productos;
      },

      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  cargarListasCompras(): void {
    this.appService.getCompras().subscribe(
      compras => {
        this.listasCompra = compras;
      },

      error => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }

  seleccionarProducto(idProducto: number | null, cantidadComprar: number): void {
    if (idProducto !== null) {
      const yaExisteEnTemporal = this.compraProductosTemporales.some(p => p.id_producto === +idProducto);
      const yaExisteEnSeleccionados = this.todosLosCompraProductos.some(p => p.id_producto === +idProducto);

      if (yaExisteEnTemporal || yaExisteEnSeleccionados) {
        console.warn('El producto ya está en la lista de compra.');
        return;
      }

      const producto = this.productosDisponibles.find(p => p.id === +idProducto);

      if (producto) {
        const newCompraProducto: CompraProducto = {
          id: null,
          id_compra: this.listaCompraSeleccionadaId!,
          id_producto: producto.id,
          cantidad: cantidadComprar,
          seleccionado: false,
          nombre_producto: producto.nombre
        };
        this.compraProductosTemporales.push(newCompraProducto);
        this.actualizarTodosLosProductos();
      }
    }
  }

  seleccionarCompra(id: number | null): void {
    if (id !== null) {
      this.listaCompraSeleccionadaId = id;
      this.cargarProductosDeCompra(id);

      const compraSeleccionada = this.listasCompra.find(compra => compra.id === id);
      if (compraSeleccionada) {
        this.nuevaDescripcionLista = compraSeleccionada.descripcion;
        this.descripcionOriginal = compraSeleccionada.descripcion;
      } else {
        this.nuevaDescripcionLista = '';
        this.descripcionOriginal = '';
      }
    }
  }


  cargarProductosDeCompra(compraId: number): void {
    this.appService.getCompraProductos().subscribe(
      todosLosCompraProductos  => {
        const productosDeLaCompra  = todosLosCompraProductos .filter(cp => cp.id_compra === compraId);

        this.productosCompraSeleccionada = productosDeLaCompra;

        productosDeLaCompra.forEach(cp => {
          this.cantidadesOriginales[cp.id_producto] = cp.cantidad
          this.cantidadSeleccionada[cp.id_producto] = cp.cantidad;
        });

        this.actualizarTodosLosProductos();
      },
      error => {
        console.error('Error al obtener los productos de la compra:', error);
      }
    );
  }

  obtenerStockProducto(idProducto: number): number {
    const producto = this.productosDisponibles.find(p => p.id === idProducto);
    return producto ? producto.cantidad_stock : 0;
  }

  cambiarCantidadComprar(idProducto: number, nuevaCantidad: number): void {
      this.cantidadSeleccionada[idProducto] = nuevaCantidad;
  }
  

  verificarCantidadesValidas(): boolean {
    const cantidadesInvalidas = Object.values(this.cantidadSeleccionada).some(cantidad => cantidad <= 0);

    if (cantidadesInvalidas) {
      alert("Todas las cantidades deben ser mayores que 0. Por favor, corrija los valores introducidos.");
      return false;
    }
    
    return true;
  }

  borrarProductoDeLista(idProducto: number): void {
    const indexTemporal = this.compraProductosTemporales.findIndex(pe => pe.id === idProducto);

    if (indexTemporal !== -1) {
      this.compraProductosTemporales.splice(indexTemporal, 1);
    } else {
      const indexExistente = this.productosCompraSeleccionada.findIndex(pe => pe.id === idProducto);

      if (indexExistente !== -1) {
        if (this.productosCompraSeleccionada[indexExistente].id !== 0) {
          this.idsProductosEliminados.push(this.productosCompraSeleccionada[indexExistente].id);
        }
        this.productosCompraSeleccionada.splice(indexExistente, 1);
      }
    }
    this.actualizarTodosLosProductos();
  }

  actualizarTodosLosProductos(): void {
    this.todosLosCompraProductos = [...this.productosCompraSeleccionada, ...this.compraProductosTemporales];
  }
  
  guardarCompra(): void {
    if (!this.editMode) {
      if (!this.nuevaDescripcionLista.trim()) {
        alert('Debe introducir una descripción para la compra.');
        return;
      }

      if (!this.esDescripcionUnica(this.nuevaDescripcionLista)) {
        return;
      }
      
      const nuevaCompra: Compra = {
        id_usuario: this.id_usuario,
        descripcion: this.nuevaDescripcionLista,
      };

      this.appService.addCompras(nuevaCompra).subscribe({
        next: (compraCreada) => {
          this.procesarProductos(compraCreada.id);
        },
        error: err => console.error('Error al crear la nueva compra:', err),
      });
    } else {
      if (!this.nuevaDescripcionLista.trim()) {
        alert('La descripción de la compra no puede estar vacía.');
        return;
      }

      if (!this.esDescripcionUnica(this.nuevaDescripcionLista)) {
        return;
      }

      this.procesarProductos(this.listaCompraSeleccionadaId as number);
    }
  }
  
  procesarProductos(idCompra: number): void {
    if (!this.verificarCantidadesValidas()) {
      return;
    }

    if (!this.esDescripcionUnica(this.nuevaDescripcionLista)) {
      return;
    }
  
    const operaciones: Observable<any>[] = [];

    operaciones.push(...this.crearOperacionesActualizarDescripcion(idCompra));
  
    operaciones.push(...this.crearOperacionesAñadir(idCompra));
  
    operaciones.push(...this.crearOperacionesActualizar());
  
    operaciones.push(...this.crearOperacionesEliminar());
  
    this.ejecutarOperaciones(operaciones);
  }

  crearOperacionesAñadir(idCompra: number): Observable<any>[] {
    return this.compraProductosTemporales.map(prod => {
      prod.id_compra = idCompra;
      return this.appService.addCompraProducto(prod).pipe(
        catchError(err => {
          console.error('Error al añadir el producto a la compra:', err);
          return of(null);
        })
      );
    });
  }

  crearOperacionesActualizar(): Observable<any>[] {
    return this.todosLosCompraProductos.filter(prod => {
      const cantidadActual = this.cantidadSeleccionada[prod.id_producto] || prod.cantidad;
      const cantidadOriginal = this.cantidadesOriginales[prod.id_producto];
      return cantidadOriginal !== undefined && cantidadActual !== cantidadOriginal && cantidadActual > 0;
    }).map(prod => {
      const compraProductoActualizado = { ...prod, cantidad: this.cantidadSeleccionada[prod.id_producto] };
      return this.appService.updateCompraProducto(compraProductoActualizado).pipe(
        catchError(err => {
          console.error('Error al actualizar CompraProducto:', err);
          return of(null);
        })
      );
    });
  }

  crearOperacionesActualizarDescripcion(idCompra: number): Observable<any>[] {
    const operaciones: Observable<any>[] = [];
    
    if (this.nuevaDescripcionLista.trim() !== this.descripcionOriginal.trim()) {
      const compraActualizada: Compra = {
        id: idCompra,
        id_usuario: this.id_usuario,
        descripcion: this.nuevaDescripcionLista.trim(),
      };

      const operacionDescripcion = this.appService.updateCompra(compraActualizada).pipe(
        catchError(err => {
          console.error('Error al actualizar la descripción de la compra:', err);
          return of(null);
        })
      );

      operaciones.push(operacionDescripcion);
    }

    return operaciones;
  }

  esDescripcionUnica(descripcion: string): boolean {
    const descripcionEnUso = this.listasCompra.some(compra => 
      compra.descripcion.toLowerCase() === descripcion.trim().toLowerCase() &&
      compra.id !== this.listaCompraSeleccionadaId
    );
    
    if (descripcionEnUso) {
      alert('La descripción de la compra debe ser única.');
      return false;
    }

    return true;
  }

  crearOperacionesEliminar(): Observable<any>[] {
    return this.idsProductosEliminados.map(idProducto => {
      return this.appService.deleteCompraProducto(idProducto).pipe(
        catchError(err => {
          console.error(`Error al eliminar el producto ${idProducto} de la compra:`, err);
          return of(null);
        })
      );
    });
  }

  ejecutarOperaciones(operaciones: Observable<any>[]): void {
    if (operaciones.length > 0) {
      forkJoin(operaciones).subscribe({
        next: () => {
          console.log('Operaciones de productos realizadas con éxito.');
          this.finalizarProceso();
        },
        error: err => console.error('Error al realizar operaciones de productos en la compra:', err),
      });
    } else {
      console.log('No hay operaciones de productos para realizar.');
      this.finalizarProceso();
    }
  }
  
  finalizarProceso(): void {
    this.dialogRef.close();
    this.comprasUpdate.notificarCompraActualizada();
    this.idsProductosEliminados = [];
    this.compraProductosTemporales = [];
  }
  
  cancelarCompra(): void {
    this.compraProductosTemporales = [];
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compra } from '../../models/compra';
import { Producto } from '../../models/producto';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-crear-editar-compra',
  templateUrl: './crear-editar-compra.component.html',
  styleUrls: ['./crear-editar-compra.component.css']
})

export class CrearEditarCompraComponent implements OnInit {
  productosDisponibles: Producto[] = [];
  productosSeleccionados: Producto[] = [];
  compras: Compra[] = [];
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearEditarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.loadProductos();
    this.loadCompras();
    if (this.data && this.data.edit) {
      this.editMode = true;
      this.rellenarLista();
    }
  }

  loadProductos() {
    this.appService.getProductos().subscribe(productos => {
      this.productosDisponibles = productos;
    });
  }

  loadCompras() {
    this.appService.getCompras().subscribe(compras => {
      this.compras = compras;
    });
  }

  rellenarLista() {
    if (this.data && this.data.listaCompra) {
      this.productosSeleccionados = [...this.data.listaCompra];
    }
  }

  agregarProductoALista(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const productId = Number(selectElement.value);
  
    const producto = this.productosDisponibles.find(p => p.id === productId);
    if (producto) {
      // Verificar si el producto ya está en la lista de productos seleccionados
      if (!this.productosSeleccionados.some(p => p.id === producto.id)) {
        // Si el producto no está en la lista, agregarlo
        this.productosSeleccionados.push({...producto, cantidad_comprar: 1});
      } else {
        // Si el producto ya está en la lista, mostrar una alerta o manejar como desees
        alert("El producto ya ha sido añadido a la lista.");
      }
    }
  }
  


  borrarProductoDeLista(productId: number) {
    this.productosSeleccionados = this.productosSeleccionados.filter(p => p.id !== productId);
  }

  guardarCompra() {
    const cantidadesInvalidas = this.productosSeleccionados.some(producto => producto.cantidad_comprar <= 0);
    if (cantidadesInvalidas) {
      alert("No se pueden tener cantidades negativas o cero para comprar.");
      return;
    }

    this.productosSeleccionados.forEach(producto => {
      const compraExistente = this.compras.find(c => c.id_producto === producto.id);
      if (compraExistente) {
        this.appService.updateCompra({...compraExistente, cantidad_comprar: producto.cantidad_comprar}).subscribe();
      } else {
        const nuevaCompra: Compra = {
          id: 0,
          id_producto: producto.id,
          nombre_producto: producto.nombre_producto,
          cantidad_stock: producto.cantidad_stock,
          cantidad_comprar: producto.cantidad_comprar,
          seleccionado: producto.seleccionado
        };

        this.appService.addCompras(nuevaCompra).subscribe();
      }
    });

    this.dialogRef.close(this.productosSeleccionados);
  }


  cancelarCompra() {
    this.dialogRef.close(false);
  }

}

import { BehaviorSubject, Subject } from "rxjs";
import { Compra } from "./models/compra";
import { Injectable } from "@angular/core";
import { CompraProducto } from "./models/compra_producto";

@Injectable({
  providedIn: 'root'
})
export class ComprasUpdateService {
  private compraActualizadaSource = new Subject<void>();
  compraActualizada$ = this.compraActualizadaSource.asObservable();

  constructor() { }

  notificarCompraActualizada(): void {
    this.compraActualizadaSource.next();
  }
}



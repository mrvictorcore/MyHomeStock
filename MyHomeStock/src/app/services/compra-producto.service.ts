import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { CompraProducto } from '../models/compra_producto';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/estructure-response/api-response';

@Injectable({
  providedIn: 'root'
})
export class CompraProductoService {
  private apiUrl = 'http://localhost:5000/api/v1/compra_producto';

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService
  ) {}

  getAllCompraProductos(): Observable<CompraProducto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<CompraProducto[]>>(`${this.apiUrl}/`)
    ) as Observable<CompraProducto[]>;
  }

  getCompraProducto(id_compra: number, id_producto: number): Observable<CompraProducto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<CompraProducto[]>>(`${this.apiUrl}/detalle/${id_compra}/${id_producto}`)
    ) as Observable<CompraProducto[]>;
  }

  getCompraProductoByUser(id_usuario: number): Observable<CompraProducto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<CompraProducto[]>>(`${this.apiUrl}/usuario/${id_usuario}`)
    ) as Observable<CompraProducto[]>;
  }

  getCompraProductoByCompra(id_compra: number): Observable<CompraProducto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<CompraProducto[]>>(`${this.apiUrl}/compra/${id_compra}`)
    ) as Observable<CompraProducto[]>;
  }

  getCompraProductoWithCantidad(id_compra: number): Observable<CompraProducto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<CompraProducto[]>>(`${this.apiUrl}/compra/${id_compra}/productos_with_CP`)
    ) as Observable<CompraProducto[]>;
  }
  
  createCompraProducto(newCompraProducto: CompraProducto): Observable<CompraProducto[]> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<CompraProducto[]>>(this.apiUrl, newCompraProducto)
    ) as Observable<CompraProducto[]>;
  }

  updateCompraProducto(compraProducto: CompraProducto): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.patch<ApiResponse<void>>(`${this.apiUrl}/detalle/${compraProducto.id_compra}/${compraProducto.id_producto}`, compraProducto)
    ) as Observable<void>;
  }

  deleteCompraProducto(id_compra: number, id_producto: number): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/detalle/${id_compra}/${id_producto}`)
    ) as Observable<void>;
  }

  confirmarCompra(id_compra: number, productos: CompraProducto[]): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<void>>(`${this.apiUrl}/confirmar/${id_compra}`, productos)
    ) as Observable<void>;
  }
}

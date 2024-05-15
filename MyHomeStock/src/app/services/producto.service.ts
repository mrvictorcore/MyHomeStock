import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:5000/api/v1/producto';

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService
  ) {}

  getAllProductos(): Observable<Producto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Producto[]>>(`this.apiUrl`)
    ) as Observable<Producto[]>;
  }

  getProducto(id_prducto: number): Observable<Producto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Producto[]>>(`${this.apiUrl}/${id_prducto}`)
    ) as Observable<Producto[]>;
  }

  getProductoByUser(id_usuario: number): Observable<Producto[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Producto[]>>(`${this.apiUrl}/usuario/${id_usuario}`)
    ) as Observable<Producto[]>;
  }

  creteProducto(newProducto: Producto): Observable<Producto[]> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<Producto[]>>(`this.apiUrl`, newProducto)
    ) as Observable<Producto[]>;
  }

  updateProducto(producto: Producto): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.put<ApiResponse<void>>(`${this.apiUrl}/${producto.id}`, producto)
    ) as Observable<void>;
  }

  updateProductoStock(producto: Producto): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.patch<ApiResponse<void>>(`${this.apiUrl}/ajustar_stock/${producto.id}`, producto)
    ) as Observable<void>;
  }

  toggleFavorito(producto: Producto): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.patch<ApiResponse<void>>(`${this.apiUrl}/toggle_favorito/${producto.id}`, producto)
    ) as Observable<void>;
  }

  deleteProducto(id_producto: number): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id_producto}`)
    ) as Observable<void>;
  }
}
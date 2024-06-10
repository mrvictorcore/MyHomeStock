import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra';
import { ApiResponse } from '../models/estructure-response/api-response';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:5000/api/v1/compra';

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService 
  ) {}

  getAllCompras(): Observable<Compra[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Compra[]>>(`${this.apiUrl}/`)
    ) as Observable<Compra[]>;
  }

  getCompra(id_compra: number): Observable<Compra[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Compra[]>>(`${this.apiUrl}/${id_compra}`)
    ) as Observable<Compra[]>;
  }

  findCompraByDescripction(descripcion: string): Observable<Compra[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Compra[]>>(`${this.apiUrl}/${descripcion}`)
    ) as Observable<Compra[]>;
  }

  getCompraByUser(id_usuario: number): Observable<Compra[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Compra[]>>(`${this.apiUrl}/usuarui/${id_usuario}`)
    ) as Observable<Compra[]>;
  }

  createCompra(newCompra: Compra): Observable<Compra[]> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<Compra[]>>(this.apiUrl, newCompra)
    ) as Observable<Compra[]>;
  }

  updateCompra(compra: Compra): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${compra.id}`, compra)
    ) as Observable<void>;
  }

  deleteCompra(id_compra: number): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id_compra}`)
    ) as Observable<void>;
  }
}

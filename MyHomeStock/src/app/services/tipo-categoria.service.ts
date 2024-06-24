import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { TipoCategoria } from '../models/tipo_categoria';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/estructure-response/api-response';

@Injectable({
  providedIn: 'root'
})
export class TipoCategoriaService {
  private apiUrl = 'http://localhost:5000/api/v1/tipo_categoria';

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService
  ) {}

  getAllTipoCategorias(): Observable<TipoCategoria[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<TipoCategoria[]>>(`${this.apiUrl}/`)
    ) as Observable<TipoCategoria[]>;
  }

  getTipoCategoria(id_tipo_categoria: number): Observable<TipoCategoria[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<TipoCategoria[]>>(`${this.apiUrl}/${id_tipo_categoria}`)
    ) as Observable<TipoCategoria[]>;
  }

  getTipoCategoriaByUser(id_usuario: number): Observable<TipoCategoria[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<TipoCategoria[]>>(`${this.apiUrl}/usuario/${id_usuario}`)
    ) as Observable<TipoCategoria[]>;
  }

  createTipoCategoria(newTipoCategoria: TipoCategoria): Observable<TipoCategoria[]> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<TipoCategoria[]>>(this.apiUrl, newTipoCategoria)
    ) as Observable<TipoCategoria[]>;
  }

  updateTipoCategoria(tipoCategoria: TipoCategoria): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${tipoCategoria.id}`, tipoCategoria)
    ) as Observable<void>;
  }

  deleteTipoCategoria(id_tipo_categoria: number): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id_tipo_categoria}`)
    ) as Observable<void>;
  }
}
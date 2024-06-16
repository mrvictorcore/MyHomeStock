import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { ApiResponse } from '../models/estructure-response/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:5000/api/v1/categoria';

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService
  ) {}

  getAllCategorias(): Observable<Categoria[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Categoria[]>>(`${this.apiUrl}/`)
    ) as Observable<Categoria[]>;
  }

  getCategoria(id_categoria: number): Observable<Categoria[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Categoria[]>>(`${this.apiUrl}/${id_categoria}`)
    ) as Observable<Categoria[]>;
  }

  getCategoriaByUser(id_usuario: number): Observable<Categoria[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Categoria[]>>(`${this.apiUrl}/usuario/${id_usuario}`)
    ) as Observable<Categoria[]>;
  }

  createCategoria(newCategoria: Categoria): Observable<Categoria[]> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<Categoria[]>>(this.apiUrl, newCategoria)
    ) as Observable<Categoria[]>;
  }

  updateCategoria(categoria: Categoria): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${categoria.id}`, categoria)
    ) as Observable<void>;
  }

  deleteCategoria(id_categoria: number): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id_categoria}`)
    ) as Observable<void>;
  }
}

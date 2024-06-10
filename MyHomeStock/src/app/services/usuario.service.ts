import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandlerService } from './handler.service';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { ApiResponse } from '../models/estructure-response/api-response';
import { AuthService } from './auth.service';
import { LoginResponse } from '../models/estructure-response/login-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5000/api/v1/usuario';

  constructor(
    private http: HttpClient,
    private handlerService: HandlerService,
    private authService: AuthService
  ) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Usuario[]>>(`${this.apiUrl}`)
    ) as Observable<Usuario[]>;
  }

  getUsuario(id: number): Observable<Usuario[]> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<Usuario[]>>(`${this.apiUrl}/${id}`)
    ) as Observable<Usuario[]>;
  }

  createUsuario(newUsuario: Usuario): Observable<Usuario[]> {
    return this.handlerService.handleResponse(
      this.http.post<ApiResponse<Usuario[]>>(`${this.apiUrl}`, newUsuario)
    ) as Observable<Usuario[]>;
  }

  updateUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.handlerService.handleResponse(
      this.http.put<ApiResponse<Usuario[]>>(`${this.apiUrl}/${usuario.id}`, usuario)
    ) as Observable<Usuario[]>;
  }

  deleteUsuario(id: number): Observable<void> {
    return this.handlerService.handleResponse(
      this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
    ) as Observable<void>;
  }

  existeUsuario(email: string): Observable<boolean> {
    return this.handlerService.handleResponse(
      this.http.get<ApiResponse<boolean>>(`${this.apiUrl}/verificar-existencia?email=${email}`)
    ) as Observable<boolean>;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.authService.login(email, password);
  }

  setUsuarioEnSession(usuarioEnSession: Usuario | undefined) {
    this.authService.setUsuarioEnSession(usuarioEnSession);
  }
  
  getUsuarioEnSession(): number | null {
    const currentUser = this.authService.getCurrentUser();
    return currentUser && currentUser.id !== undefined && currentUser.id !== null ? currentUser.id : null;
  }
  
  isLogin(): Observable<boolean> {
    return of(this.authService.isAuthenticated());
  }

  removeUsuarioEnSession() {
    this.authService.logout();
  }
}
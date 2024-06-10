import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/estructure-response/login-response';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenKey = 'auth-token';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storeUser = localStorage.getItem('MHS-currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storeUser ? JSON.parse(storeUser): null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<any>(`http://localhost:5000/api/v1/usuario/login`, { email, password })
    .pipe(tap(response => {
      if (response.token) {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('MHS-currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      }
    }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('MHS-currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  setUsuarioEnSession(usuarioEnSession: Usuario | undefined) {
    if (usuarioEnSession) {
      localStorage.setItem('MHS-currentUser', JSON.stringify(usuarioEnSession));
      this.currentUserSubject.next(usuarioEnSession);
    } else {
      localStorage.removeItem('MHS-currentUser');
      this.currentUserSubject.next(null);
    }
  }
}
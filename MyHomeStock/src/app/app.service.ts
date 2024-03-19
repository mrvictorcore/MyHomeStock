import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { Producto } from './models/producto';
import { Categoria } from './models/categoria';
import { Tipo } from './models/tipo';
import { Descripcion } from './models/descripcion';
import { Observable, of } from 'rxjs';
import { Compra } from './models/compra';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Métodos para Usuario
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  addUsuario(newUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, newUsuario);
  }

  updateUsuario(newUsuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${newUsuario.ID}`, newUsuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // Métodos para Producto
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/productos/${id}`);
  }

  addProductos(newProducto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/productos`, newProducto);
  }

  updateProducto(newProducto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/productos/${newProducto.id}`, newProducto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`);
  }


  // restarStock(ID_producto: number, cantidadRestar: number): Observable<Producto | null> {
  //   const prod = PRODUCTOS.find(p => p.id === ID_producto);
  //   if (prod && prod.cantidad_stock >= cantidadRestar) {
  //     prod.cantidad_stock -= cantidadRestar;
  //     return of(prod);
  //   }
  //   return of(null);
  // }

  // sumarStock(ID_producto: number, cantidadSumar: number): Observable<Producto | null> {
  //   const prod = PRODUCTOS.find(p => p.id === ID_producto);
  //   if (prod) {
  //     prod.cantidad_stock += cantidadSumar;
  //     return of(prod);
  //   }
  //   return of(null);
  // }

  // Métodos para Compra
  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}/compras`);
  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/compras/${id}`);
  }

  addCompras(newCompra: Compra): Observable<Compra> {
    return this.http.post<Compra>(`${this.apiUrl}/compras`, newCompra);
  }

  updateCompra(newCompra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiUrl}/compras/${newCompra.id}`, newCompra);
  }

  deleteCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compras/${id}`);
  }

  // Métodos para Categoria
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`);
  }

  addCategoria(newCategoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categorias`, newCategoria);
  }

  updateCategoria(newCategoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categorias/${newCategoria.ID}`, newCategoria);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorias/${id}`);
  }

  // Métodos para Tipo
  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}/tipos`);
  }

  getTipo(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/tipos/${id}`);
  }

  addTipo(newTipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(`${this.apiUrl}/tipos`, newTipo);
  }

  updateTipo(newTipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.apiUrl}/tipos/${newTipo.ID}`, newTipo);
  }

  deleteTipo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tipos/${id}`);
  }

  // Métodos para Descripcion
  getDescripciones(): Observable<Descripcion[]> {
    return this.http.get<Descripcion[]>(`${this.apiUrl}/descripciones`);
  }

  getDescripcion(id: number): Observable<Descripcion> {
    return this.http.get<Descripcion>(`${this.apiUrl}/descripciones/${id}`);
  }

  addDescripcion(newDescripcion: Descripcion): Observable<Descripcion> {
    return this.http.post<Descripcion>(`${this.apiUrl}/descripciones`, newDescripcion);
  }

  updateDescripcion(newDescripcion: Descripcion): Observable<Descripcion> {
    return this.http.put<Descripcion>(`${this.apiUrl}/descripciones/${newDescripcion.ID}`, newDescripcion);
  }

  deleteDescripcion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/descripciones/${id}`);
  }

}


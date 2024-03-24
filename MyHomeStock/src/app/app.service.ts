import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { Producto } from './models/producto';
import { Categoria } from './models/categoria';
import { Tipo } from './models/tipo';
import { Descripcion } from './models/descripcion';
import { Observable, of } from 'rxjs';
import { Compra } from './models/compra';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) { }

  // Métodos para Usuario
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario`);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/${id}`);
  }

  addUsuario(newUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario`, newUsuario);
  }

  updateUsuario(newUsuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuario/${newUsuario.ID}`, newUsuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }

  // Métodos para Producto
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/producto`).pipe(
      map((productos: Producto[]) =>
        productos.filter(p => p.cantidad_stock > 0 || p.favorito)
      )
    );
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/producto/${id}`);
  }

  addProductos(newProducto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/producto`, newProducto);
  }

  updateProducto(newProducto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/producto/${newProducto.id}`, newProducto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/producto/${id}`);
  }

  restarStock(idProducto: number, cantidadRestar: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/producto/restarStock/${idProducto}`, { cantidadRestar });
  }
  
  sumarStock(idProducto: number, cantidadSumar: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/producto/sumarStock/${idProducto}`, { cantidadSumar });
  }

  toggleFavoritoProducto(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/productos/${id}/favorito`, {});
  }

  // Métodos para Compra
  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}/compra`);
  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/compra/${id}`);
  }

  addCompras(newCompra: Compra): Observable<Compra> {
    return this.http.post<Compra>(`${this.apiUrl}/compra`, newCompra);
  }

  updateCompra(newCompra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiUrl}/compra/${newCompra.id}`, newCompra);
  }

  deleteCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compra/${id}`);
  }

  updateCantidadCompra(idCompra: number, nuevaCantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/compra/${idCompra}/cantidad`, { nuevaCantidad });
  }

  // Métodos para Categoria
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoria`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categoria/${id}`);
  }

  addCategoria(newCategoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categoria`, newCategoria);
  }

  updateCategoria(newCategoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categoria/${newCategoria.ID}`, newCategoria);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categoria/${id}`);
  }

  // Métodos para Tipo
  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}/tipo`);
  }

  getTipo(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/tipo/${id}`);
  }

  addTipo(newTipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(`${this.apiUrl}/tipo`, newTipo);
  }

  updateTipo(newTipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.apiUrl}/tipo/${newTipo.ID}`, newTipo);
  }

  deleteTipo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tipo/${id}`);
  }

  // Métodos para Descripcion
  getDescripciones(): Observable<Descripcion[]> {
    return this.http.get<Descripcion[]>(`${this.apiUrl}/descripcion`);
  }

  getDescripcion(id: number): Observable<Descripcion> {
    return this.http.get<Descripcion>(`${this.apiUrl}/descripcion/${id}`);
  }

  addDescripcion(newDescripcion: Descripcion): Observable<Descripcion> {
    return this.http.post<Descripcion>(`${this.apiUrl}/descripcion`, newDescripcion);
  }

  updateDescripcion(newDescripcion: Descripcion): Observable<Descripcion> {
    return this.http.put<Descripcion>(`${this.apiUrl}/descripcion/${newDescripcion.ID}`, newDescripcion);
  }

  deleteDescripcion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/descripcion/${id}`);
  }

}


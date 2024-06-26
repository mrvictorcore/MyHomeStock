import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { Producto } from './models/producto';
import { Categoria } from './models/categoria';
import { TipoCategoria } from './models/tipo_categoria';
import { CompraProducto } from './models/compra_producto';
import { Observable, of } from 'rxjs';
import { Compra } from './models/compra';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5000/api/v1';
  usuarioEnSession: any = null;

  constructor(private http: HttpClient) { 
    this.usuarioEnSession = localStorage.getItem("FP-usuarioEnSession");
  }

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
    return this.http.put<Usuario>(`${this.apiUrl}/usuario/${newUsuario.id}`, newUsuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }

  registrarUsuario(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/usuario/login`, {email, password});
  }

  setUsuarioEnSession(usuarioEnSession: Usuario | undefined) {
    this.usuarioEnSession = usuarioEnSession?.id;
    if (this.usuarioEnSession)
      localStorage.setItem("FP-usuarioEnSession", this.usuarioEnSession.toString());
  }

  removeUsuarioEnSession() {
    this.usuarioEnSession = null;
    localStorage.removeItem("FP-usuarioEnSession");
  }

  existeUsuario(email: string){
    return this.http.get(`${this.apiUrl}/usuario/verificar-existencia?email=${email}`).pipe(map((res:any) => res && res.length > 0));
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${this.apiUrl}/usuario/${usuario.id}`, usuario);
  }

  isLogin(){
    return of(this.usuarioEnSession != null);
  }

  getUsuarioId() {
    return this.usuarioEnSession;
  }

  getUsuarioEnSession() {
    return localStorage.getItem("FP-usuarioEnSession");
  }

  // Métodos para Producto
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/producto`);
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

  ajustarStock(idProducto: number, cantidadAjuste: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/producto/ajustarStock/${idProducto}`, { cantidadAjuste });
  }

  toggleFavoritoProducto(id: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/producto/${id}/toggleFavorito`, {});
  }

  // Métodos para Compra
  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}/compra`);
  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.apiUrl}/compra/${id}`);
  }

  addCompras(newCompra: Compra): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/compra`, newCompra).pipe(
    map(res => res.data)
    );
  }

  updateCompra(newCompra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiUrl}/compra/`, newCompra);
  }

  deleteCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compra/${id}`);
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
    return this.http.put<Categoria>(`${this.apiUrl}/categoria/${newCategoria.id}`, newCategoria);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categoria/${id}`);
  }

  // Métodos para TipoCategoria
  getTiposCategorias(): Observable<TipoCategoria[]> {
    return this.http.get<TipoCategoria[]>(`${this.apiUrl}/tipo_categoria`);
  }

  getTipoCategoria(id: number): Observable<TipoCategoria> {
    return this.http.get<TipoCategoria>(`${this.apiUrl}/tipo_categoria/${id}`);
  }

  addTipoCategoria(newTipo: TipoCategoria): Observable<TipoCategoria> {
    return this.http.post<TipoCategoria>(`${this.apiUrl}/tipo_categoria`, newTipo);
  }

  updateTipoCategoria(newTipo: TipoCategoria): Observable<TipoCategoria> {
    return this.http.put<TipoCategoria>(`${this.apiUrl}/tipo_categoria/${newTipo.id}`, newTipo);
  }

  deleteTipoCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tipo_categoria/${id}`);
  }

  // Métodos para CompraProducto
  getCompraProductos(): Observable<CompraProducto[]> {
    return this.http.get<CompraProducto[]>(`${this.apiUrl}/compra_producto`);
  }

  getCompraProducto(id: number): Observable<CompraProducto> {
    return this.http.get<CompraProducto>(`${this.apiUrl}/compra_producto/${id}`);
  }

  addCompraProducto(newCompraProducto: CompraProducto): Observable<CompraProducto> {
    return this.http.post<CompraProducto>(`${this.apiUrl}/compra_producto`, newCompraProducto);
  }

  updateCompraProducto(newCompraProducto: CompraProducto): Observable<CompraProducto> {
    return this.http.put<CompraProducto>(`${this.apiUrl}/compra_producto/${newCompraProducto.id}`, newCompraProducto);
  }


  deleteCompraProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compra_producto/${id}`);
  }

}


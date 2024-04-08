import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { Producto } from './models/producto';
import { Categoria } from './models/categoria';
import { Tipo } from './models/tipo_categoria';
import { Descripcion } from './models/compra_producto';
import { Observable, of } from 'rxjs';
import { Compra } from './models/compra';

export const USUARIOS: Usuario[] = [
  { ID: 1, Nombre_usuario: 'victor', Contrasena: '1234', Email: 'victor@1234.com' },
  { ID: 2, Nombre_usuario: 'ariel', Contrasena: '1234', Email: 'ariel@1234.com' }
];

export const PRODUCTOS: Producto[] = [
  { id: 1, nombre_producto: 'pollo', id_categoria: 1, id_tipo: 1, id_descripcion: 1, cantidad_stock: 10, cantidad_min: 2, favorito: true, cantidad_comprar: 0, seleccionado: false },
  { id: 2, nombre_producto: 'Lejia', id_categoria: 2, id_tipo: 4, id_descripcion: 4, cantidad_stock: 15, cantidad_min: 3, favorito: false, cantidad_comprar: 0, seleccionado: false },
  { id: 3, nombre_producto: 'Pienso', id_categoria: 1, id_tipo: 3, id_descripcion: 5, cantidad_stock: 0, cantidad_min: 3, favorito: false, cantidad_comprar: 0, seleccionado: false },
  { id: 4, nombre_producto: 'Manzana', id_categoria: 1, id_tipo: 1, id_descripcion: 3, cantidad_stock: 0, cantidad_min: 3, favorito: true, cantidad_comprar: 0, seleccionado: false }
];

export const COMPRA: Compra[] = [
  // { id: 1, nombre_producto: 'pollo', id_categoria: 1, id_tipo: 1, id_descripcion: 1, cantidad_stock: 10, cantidad_min: 2, favorito: true, cantidad_comprar: 0, seleccionado: false },
  // { id: 2, nombre_producto: 'Lejia', id_categoria: 2, id_tipo: 4, id_descripcion: 4, cantidad_stock: 15, cantidad_min: 3, favorito: true, cantidad_comprar: 0, seleccionado: false },
  // { id: 3, nombre_producto: 'Pienso', id_categoria: 1, id_tipo: 3, id_descripcion: 5, cantidad_stock: 0, cantidad_min: 3, favorito: true, cantidad_comprar: 0, seleccionado: false },
  // { id: 4, nombre_producto: 'Manzana', id_categoria: 1, id_tipo: 1, id_descripcion: 3, cantidad_stock: 0, cantidad_min: 3, favorito: true, cantidad_comprar: 0, seleccionado: false }
];

export const CATEGORIAS: Categoria[] = [
  { ID: 1, Nombre_categoria: 'Alimento'},
  { ID: 2, Nombre_categoria: 'Limpieza'}
];

export const TIPOS: Tipo[] = [
  { ID: 1, Nombre_tipo: 'Comida'},
  { ID: 2, Nombre_tipo: 'Despensa'},
  { ID: 3, Nombre_tipo: 'Mascota'},
  { ID: 4, Nombre_tipo: 'Hogar'},
  { ID: 5, Nombre_tipo: 'Personal'}
];

export const DESCRICION: Descripcion[] = [
  { ID: 1, ID_categoria: 1, ID_tipo: 1, Nombre_descripcion: 'Carne'},
  { ID: 2, ID_categoria: 2, ID_tipo: 2, Nombre_descripcion:  'Verdura'},
  { ID: 3, ID_categoria: 1, ID_tipo: 1, Nombre_descripcion: 'Fruta'},
  { ID: 4, ID_categoria: 2, ID_tipo: 2, Nombre_descripcion:  'Provisiones'},
  { ID: 5, ID_categoria: 2, ID_tipo: 2, Nombre_descripcion:  'Comida Mascota'}
];


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  // Métodos para Usuario
  getUsuarios(): Observable<Usuario[]> {
    return of(USUARIOS);
  }

  getUsuario(id: number): Observable<Usuario | undefined> {
    const user = USUARIOS.find(u => u.ID === id);
    return of(user);
  }

  addUsuario(newUsuario: Usuario): Observable<Usuario> {
    newUsuario.ID = USUARIOS.length > 0 ? Math.max(...USUARIOS.map(u => u.ID)) + 1 : 1;
    USUARIOS.push(newUsuario);
    return of(newUsuario);
  }

  updateUsuario(newUsuario: Usuario): Observable<any> {
    const index = USUARIOS.findIndex(u => u.ID === newUsuario.ID);
    if (index !== -1) {
      USUARIOS[index] = newUsuario;
    }
    return of(newUsuario);
  }

  deleteUsuario(id: number): Observable<Usuario | null> {
    const index = USUARIOS.findIndex(u => u.ID === id);
    if (index !== -1) {
      USUARIOS.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para Producto
  getProductos(): Observable<Producto[]> {
    return of(PRODUCTOS);
  }

  getProducto(id: number): Observable<Producto | undefined> {
    const prod = PRODUCTOS.find(p => p.id === id);
    return of(prod);
  }

  addProductos(newProducto: Producto): Observable<Producto> {
    if (newProducto && typeof newProducto === 'object') {
      newProducto.id = PRODUCTOS.length > 0 ? Math.max(...PRODUCTOS.map(p => p.id)) + 1 : 1;
      PRODUCTOS.push(newProducto);
    }
      return of(newProducto);
  }


  updateProducto(newProducto: Producto): Observable<any> {
    const index = PRODUCTOS.findIndex(p => p.id === newProducto.id);
    if (index !== -1) {
      PRODUCTOS[index] = newProducto;
    }
    return of(newProducto);
  }

  deleteProducto(id: number): Observable<Producto | null> {
    const index = PRODUCTOS.findIndex(p => p.id === id);
    if (index !== -1) {
      PRODUCTOS.splice(index, 1);
    }
    return of(null);
  }

  restarStock(ID_producto: number, cantidadRestar: number): Observable<Producto | null> {
    const prod = PRODUCTOS.find(p => p.id === ID_producto);
    if (prod && prod.cantidad_stock >= cantidadRestar) {
      prod.cantidad_stock -= cantidadRestar;
      return of(prod);
    }
    return of(null);
  }

  sumarStock(ID_producto: number, cantidadSumar: number): Observable<Producto | null> {
    const prod = PRODUCTOS.find(p => p.id === ID_producto);
    if (prod) {
      prod.cantidad_stock += cantidadSumar;
      return of(prod);
    }
    return of(null);
  }

  // Métodos para Compra
    getCompras(): Observable<Compra[]> {
    return of(COMPRA);
  }

  getCompra(id: number): Observable<Compra | undefined> {
    const prodCompra = COMPRA.find(c => c.id === id);
    return of(prodCompra);
  }

  addCompras(newCompra: Compra): Observable<Compra> {
    if (newCompra && typeof newCompra === 'object') {
      newCompra.id = COMPRA.length > 0 ? Math.max(...COMPRA.map(c => c.id)) + 1 : 1;
      COMPRA.push(newCompra);
    }
    return of(newCompra);
  }


  updateCompra(newCompra: Compra): Observable<any> {
    const index = COMPRA.findIndex(c => c.id === newCompra.id);
    if (index !== -1) {
      COMPRA[index] = newCompra;
    }
    return of(newCompra);
  }

  deleteCompra(id: number): Observable<Compra | null> {
    const index = COMPRA.findIndex(c => c.id === id);
    if (index !== -1) {
      COMPRA.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para Categoria
  getCategorias(): Observable<Categoria[]> {
    return of(CATEGORIAS);
  }

  grtCategoria(id: number): Observable<Categoria | undefined> {
    const category = CATEGORIAS.find(c => c.ID === id);
    return of(category);
  }

  addCategoria(newCategoria: Categoria): Observable<Categoria> {
    newCategoria.ID = CATEGORIAS.length > 0 ? Math.max(...CATEGORIAS.map(c => c.ID)) + 1 : 1;
    CATEGORIAS.push(newCategoria);
    return of(newCategoria);
  }

  updateCategoria(newCategoria: Categoria): Observable<any> {
    const index = CATEGORIAS.findIndex(c => c.ID === newCategoria.ID);
    if (index !== -1) {
      CATEGORIAS[index] = newCategoria;
    }
    return of(newCategoria);
  }

  deleteCategoria(id: number): Observable<Categoria | null> {
    const index = CATEGORIAS.findIndex(c => c.ID === id);
    if (index !== -1) {
      CATEGORIAS.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para Tipo
  getTipos(): Observable<Tipo[]> {
    return of(TIPOS);
  }

  getTipo(id: number): Observable<Tipo | undefined> {
    const tipo = TIPOS.find(t => t.ID === id);
    return of(tipo);
  }

  addTipo(newTipo: Tipo): Observable<Tipo> {
    newTipo.ID = TIPOS.length > 0 ? Math.max(...TIPOS.map(t => t.ID)) + 1 : 1;
    TIPOS.push(newTipo);
    return of(newTipo);
  }

  updateTipo(newTipo: Tipo): Observable<any> {
    const index = TIPOS.findIndex(t => t.ID === newTipo.ID);
    if (index !== -1) {
      TIPOS[index] = newTipo;
    }
    return of(newTipo);
  }

  deleteTipo(id: number): Observable<Tipo | null> {
    const index = TIPOS.findIndex(t => t.ID === id);
    if (index !== -1) {
      TIPOS.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para Descripcion
  getDescripciones(): Observable<Descripcion[]> {
    return of(DESCRICION);
  }

  getDescripcion(id: number): Observable<Descripcion | undefined> {
    const desc = DESCRICION.find(d => d.ID === id);
    return of(desc);
  }

  addDescripcion(newDescripcion: Descripcion): Observable<Descripcion> {
    newDescripcion.ID = DESCRICION.length > 0 ? Math.max(...DESCRICION.map(d => d.ID)) + 1 : 1;
    DESCRICION.push(newDescripcion);
    return of(newDescripcion);
  }

  updateDescripcion(newDescripcion: Descripcion): Observable<any> {
    const index = DESCRICION.findIndex(d => d.ID === newDescripcion.ID);
    if (index !== -1) {
      DESCRICION[index] = newDescripcion;
    }
    return of(newDescripcion);
  }

  deleteDescripcion(id: number): Observable<Descripcion | null> {
    const index = DESCRICION.findIndex(d => d.ID === id);
    if (index !== -1) {
      DESCRICION.splice(index, 1);
    }
    return of(null);
  }

}

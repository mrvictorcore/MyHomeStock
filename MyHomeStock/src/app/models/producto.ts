export interface Producto {
    id: number;
    nombre_producto: string;
    id_categoria: number;
    id_tipo: number;
    id_descripcion: number;
    cantidad_stock: number;
    cantidad_min: number;
    favorito: boolean;
    cantidad_comprar: number
    seleccionado: boolean;
}
  
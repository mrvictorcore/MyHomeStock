export interface Producto {
    id: number;
    id_categoria: number;
    id_usuario: number;

    nombre: string;
    descripcion: string;
    cantidad_stock: number;
    cantidad_min_mensual: number;
    favorito: boolean;
}
  
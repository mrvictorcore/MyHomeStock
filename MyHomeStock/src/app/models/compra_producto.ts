export interface CompraProducto {
    id_compra: number;
    id_producto: number;
    
    cantidad: number;
    seleccionado: boolean;

    nombre_producto?: string;
    stock_producto?: number;
}
  
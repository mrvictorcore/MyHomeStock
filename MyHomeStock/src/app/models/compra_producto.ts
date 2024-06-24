export interface CompraProducto {
    id_compra: number;
    id_producto: number;
    
    cantidad_comprar: number;
    cantidad_disponible: number;
    seleccionado: boolean;

    nombre?: string;
    cantidad_stock?: number;
}
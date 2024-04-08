export interface CompraProducto {
    id: any;
    id_compra: number;
    id_producto: number;
    
    cantidad: number;
    seleccionado: boolean;
    nombre_producto?: string;
    cantidadModificada?: boolean;
}
  
import { Producto } from "./producto";

export interface ProductoExtendido extends Producto {
  cantidad: number;
  id_compra?: number | null;
}
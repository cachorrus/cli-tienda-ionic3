import { Producto } from "./producto.model";

export interface OrdenDetalle {
    _id: string;
    orden: string;
    producto: Producto;
}
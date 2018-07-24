import { Linea } from "./linea.model";

export interface Producto {
    _id: string;
    codigo: string;
    producto: string;
    precioCompra: number;
    descripcion: string;
    proveedor: string;
    linea?: Linea;
}
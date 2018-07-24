import { OrdenDetalle } from "./ordenDetalle.model";

export interface Orden {
    _id: string;
    create_at: string;
    usuario: string;
    orden_detalle: OrdenDetalle;
}
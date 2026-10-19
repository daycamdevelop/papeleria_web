export interface DevolucionElement {
    numfactura: string;
    cliente: string;
}

export interface DevolucionTablaElement {
    numerofactura: string;
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    cantidadadevolver: number;
    preciototal: string;
}
export interface KardexElement {
    codigoproducto: string;
    nombreproducto: string;
    fecha: string;
    item: number;
    entradas: number;
    salidas: number;
    cantidadfinal: number;
}

export interface KardexTablaElement {
    fecha: string;
    tipomovimiento: string;
    factura: string;
    cantidad: number;
    salidas: number;
    entradas: number;
    saldo: number;
    usuario: number;
}
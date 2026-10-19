export interface InventarioElement {
    codigoproducto: string;
    nombreproducto: string;
    linea: number;
    bodega: number;
    cantidaditems: string;
    cantidadunidades: string;
    costocompratotal: string;
    costoventatotal: string;
}

export interface InventarioTablaElement {
    bodega: string;
    codigo: string;
    producto: string;
    linea: string;
    cantidad: number;
    costo: number;
    precio: number;
    costoventa: number;
    costoventatotal: number;
    costoventa2: number;
    costoventa3: number;
    iva: string;
    tipoiva: string;
    serial: string;
}
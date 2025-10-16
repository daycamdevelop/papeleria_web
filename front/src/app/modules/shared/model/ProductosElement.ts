export interface ProductosElement {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
    fecharegistro: string;
    linea: number;
    bodega: number;
    estado: string;
    desvincular: string;
    costo: number;
    costoventa: number;
    serial: string;
    costoventa2: number;
    costoventa3: number;
    iva: number;
    observacion: string;
    registro: string;
    registro2: string;
}

export interface ProductosTablaCompraElement {
    codigo: string;
    producto: string;
    prodtotal: string;
    costocompra: number;
    cantidad: number;
    costocompratotal: number;
    costoventa: number;
    id: number;
    costoventa2: number;
    costoventa3: number;
    iva: number;
    [key: string]: any;
}

export interface ProductosTablaFacturaElement {
    codigo: string;
    producto: string;
    prodtotal: string;
    costoventa: number;
    cantidad: number;
    costoventatotal: number;
    id: number;
    iva: number;
    costocompra: number;
    serial: string;
    selected: boolean;
    [key: string]: any;
}
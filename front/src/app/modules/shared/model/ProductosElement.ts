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

export interface MasivoCompraElement {
    CODIGO: string;
    NOMBRE: string;
    CANTIDAD: string;
    COSTO_COMPRA: string;
    COSTO_VENTA: string;
    COSTO_VENTA_2: string;
    COSTO_VENTA_3: string;
    SERIAL: string;
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
    porcentaje: number;
    [key: string]: any;
}
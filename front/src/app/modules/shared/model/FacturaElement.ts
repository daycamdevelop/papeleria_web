export interface FacturaElement {
    bodega: string;
    caja: string;
    cambio: string;
    catidadproductos: string;
    cliente: string;
    codigocredito: string;
    costoventa2: string;
    costoventa3: string;
    credito: string;
    dinerorecibido: string;
    dinerorecibido1: string;
    estado: string;
    fecha_anulacion: string;
    fechacredito: string;
    fechafactura: string;
    fechaimpresion: string;
    formapago: string;
    formapago1: string;
    imprimir: string;
    ivavalor: string;
    notacredito: string;
    numfactura: string;
    origen: string;
    porcentaje: string;
    precio: string;
    precio_unitario: string;
    producto: string;
    registro: string;
    registro2: string;
    subtotal: string;
    usuario: string;
    vendedor: string;
    estado_fac?: string;
    cufe?: string;
    productos?: Productos[]
    clienteDV?: string;
    clienteNombre?: string;
    clienteTelefono?: string;
    clienteDireccion?: string;
    clienteCorreo?: string;
    clienteTipoDoc?: string;
    clienteTipopersona?: string;
    clienteCodigoDane?: string;
    clienteTipoiva?: string;
}

export interface Productos {
    producto: string;
    catidadproductos: string;
    precio: string;
    precio_unitario: string;
    codProd?: string;
    iva?: number;
    porcentaje?: number;

}

export interface FacturaDevolucionElement {
    bodega: string;
    caja: string;
    cambio: string;
    catidadproductos: string;
    cliente: string;
    codigocredito: string;
    costoventa2: string;
    costoventa3: string;
    credito: string;
    dinerorecibido: string;
    dinerorecibido1: string;
    estado: string;
    fecha_anulacion: string;
    fechacredito: string;
    fechafactura: string;
    fechaimpresion: string;
    formapago: string;
    formapago1: string;
    id: string;
    imprimir: string;
    ivavalor: string;
    notacredito: string;
    numfactura: string;
    origen: string;
    porcentaje: string;
    precio: string;
    precio_unitario: string;
    producto: string;
    registro: string;
    registro2: string;
    subtotal: string;
    usuario: string;
    vendedor: string;
}

export interface FacturaDevolucionTablaElement {
    numfactura: string;
    cliente: string;
    fechafactura: string;
    estado: string;
    valortotal: string;
}
package com.company.inventory.model;

import lombok.Data;

@Data
public class Inventario{
    
    private String bodega;
    private String codigo;
    private String producto;
    private String linea; 
    private int cantidad;
    private int costo;
    private int precio;
    private int costoventa;
    private long costoventatotal;
    private int costoventa2;
    private int costoventa3;
    private int iva;
    private String tipoiva;
    private String serial;
    
	public Inventario(String bodega, String codigo, String producto, String linea, int cantidad, int costo, int precio,
			int costoventa, long costoventatotal, int costoventa2, int costoventa3, int iva, String tipoiva,
			String serial) {
		super();
		this.bodega = bodega;
		this.codigo = codigo;
		this.producto = producto;
		this.linea = linea;
		this.cantidad = cantidad;
		this.costo = costo;
		this.precio = precio;
		this.costoventa = costoventa;
		this.costoventatotal = costoventatotal;
		this.costoventa2 = costoventa2;
		this.costoventa3 = costoventa3;
		this.iva = iva;
		this.tipoiva = tipoiva;
		this.serial = serial;
	}
}


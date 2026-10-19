package com.company.inventory.model;

import lombok.Data;

@Data
public class FacturaPDF{

	private int id;
	private int numfactura; 
	private String origen;
	private String codigo;
	private String fechafactura;
	private String cliente;
	private String nit;
	private String direccioncli;
	private String telefonocli;
	private String nombre;
	private int catidadproductos;
	private int precio_unitario;
	private int credito; 
	private int precio;
	private String pago;
	private int dinerorecibido; 
	private int cambio; 
	private int porcentaje; 
	private String vendedor;
	private int val;
	private int val2;
	private String titulo;
	private String emp;
	private String nomemp;
	private String nite;
	private String direccion;
	private String tel1;
	private String tel2;
	private String emp1;
	private String emp2;
	private String rp1;
	private String rp2;
	private String rp3;
	private String rp4;
    private String titulorespos;
    private int iva;
    private String domicilio;
    private String fechacredito;
    private String pago1;
    private int dinerorecibido1;
    private int p;
    private int p1;
    private int items;
    private int articulos;
	public FacturaPDF(int id, int numfactura, String origen, String codigo, String fechafactura, String cliente,
			String nit, String direccioncli, String telefonocli, String nombre, int catidadproductos,
			int precio_unitario, int credito, int precio, String pago, int dinerorecibido, int cambio, int porcentaje,
			String vendedor, int val, int val2, String titulo, String emp, String nomemp, String nite, String direccion,
			String tel1, String tel2, String emp1, String emp2, String rp1, String rp2, String rp3, String rp4,
			String titulorespos, int iva, String domicilio, String fechacredito, String pago1, int dinerorecibido1,
			int p, int p1, int items, int articulos) {
		super();
		this.id = id;
		this.numfactura = numfactura;
		this.origen = origen;
		this.codigo = codigo;
		this.fechafactura = fechafactura;
		this.cliente = cliente;
		this.nit = nit;
		this.direccioncli = direccioncli;
		this.telefonocli = telefonocli;
		this.nombre = nombre;
		this.catidadproductos = catidadproductos;
		this.precio_unitario = precio_unitario;
		this.credito = credito;
		this.precio = precio;
		this.pago = pago;
		this.dinerorecibido = dinerorecibido;
		this.cambio = cambio;
		this.porcentaje = porcentaje;
		this.vendedor = vendedor;
		this.val = val;
		this.val2 = val2;
		this.titulo = titulo;
		this.emp = emp;
		this.nomemp = nomemp;
		this.nite = nite;
		this.direccion = direccion;
		this.tel1 = tel1;
		this.tel2 = tel2;
		this.emp1 = emp1;
		this.emp2 = emp2;
		this.rp1 = rp1;
		this.rp2 = rp2;
		this.rp3 = rp3;
		this.rp4 = rp4;
		this.titulorespos = titulorespos;
		this.iva = iva;
		this.domicilio = domicilio;
		this.fechacredito = fechacredito;
		this.pago1 = pago1;
		this.dinerorecibido1 = dinerorecibido1;
		this.p = p;
		this.p1 = p1;
		this.items = items;
		this.articulos = articulos;
	}
	
}


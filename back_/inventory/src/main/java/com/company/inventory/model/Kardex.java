package com.company.inventory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
public class Kardex{

	private String fecha; 
	private String tipo; 
	private int numerofactura; 
	private int cantidad;
	private int entradas;
	private int salidas;
	private int saldo;
	private String usuarioSel;
	
	public Kardex(String fecha, String tipo, int numerofactura, int cantidad, int entradas, int salidas,
			int saldo, String usuarioSel) {
		super();
		this.fecha = fecha;
		this.tipo = tipo;
		this.numerofactura = numerofactura;
		this.cantidad = cantidad;
		this.entradas = entradas;
		this.salidas = salidas;
		this.saldo = saldo;
		this.usuarioSel = usuarioSel;
	}	
}


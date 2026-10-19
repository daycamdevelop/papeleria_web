package com.company.inventory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="cuentas_t")
public class CuentasT{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String concepto; 
	private String e_s; 
	private String valor; 
	private String fecha;
	private int usuario;
	
	public CuentasT(String concepto, String e_s, String valor, String fecha, int usuario) {
		super();
		this.concepto = concepto;
		this.e_s = e_s;
		this.valor = valor;
		this.fecha = fecha;
		this.usuario = usuario;
	}
}


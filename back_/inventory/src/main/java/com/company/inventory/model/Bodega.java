package com.company.inventory.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="productos")
public class Bodega implements Serializable{

	private static final long serialVersionUID = -4310027227752446841L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String codigo;
	private String nombre;
	private String cantidad;
	private String fecharegistro;
	private int linea;
	private int bodega;
	private String estado;
	private String desvincular;
	private int costo;
	private int costoventa;
	private String serial;
	private int costoventa2;
	private int costoventa3;
	private int iva;
	private String observacion;
	private String registro;
	private String registro2;
}


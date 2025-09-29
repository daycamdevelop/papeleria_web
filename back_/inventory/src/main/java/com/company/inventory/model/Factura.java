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
public class Factura implements Serializable{

	private static final long serialVersionUID = -4310027227752446841L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	private int numfactura;
	private String fechafactura;
	private int cliente;
	private int producto;
	private String catidadproductos;
	private String estado;
	private int precio;
	private int credito;
	private int precio_unitario;
	private String fecha_anulacion;
	private int usuario;
	private String vendedor;
	private int porcentaje;
	private String origen;
	private String formapago;
	private int dinerorecibido;
	private int cambio;
	private int costoventa2;
	private int costoventa3;
	private String codigocredito;
	private boolean imprimir;
	private int subtotal;
	private int ivavalor;
	private String fechaimpresion;
	private int bodega;
	private String notacredito;
	private String fechacredito;
	private String formapago1;
	private int dinerorecibido1;
	private String registro;
	private String registro2;
	private String caja;
}


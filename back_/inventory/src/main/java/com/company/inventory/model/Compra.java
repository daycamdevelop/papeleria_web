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
@Table(name="compras")
public class Compra implements Serializable{

	private static final long serialVersionUID = -4310027227752446841L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int numfactura;
	private String fechafactura;
	private int proveedor;
	private int producto;
	private String catidadproductos;
	private String estado;
	private int precio;
	private int precio_unitario;
	private int usuario;
	private int num_preliminar;
	private int precio_venta;
	private int credito;
	private String numfacturap;
	private String formapago;
	private String origen;
	private int precio_venta2;
	private int precio_venta3;
	private int dinerorecibido;
	private int cambio;
	private int subtotal;
	private int ivavalor;
	private int porcentaje;
	private int bodega;
	private String registro;
	private String registro2;
}


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
@Table(name="resolucion")
public class Resolucion implements Serializable{

	private String numresolucion;
	@Id
	private String prefijo;
	private String numfacinico;
	private String numfacfinal;
	private String resfecinicio;
	private String resfecfinal;
	private String url;
	private String token;
	private String correo;
	private String pass;
	private String nit;
	private String ciudad;
	private String cantidad;
	private String licfecinicio;
	private String licfecfinal;
	private String prefijopers;
}


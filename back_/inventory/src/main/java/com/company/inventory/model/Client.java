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
@Table(name="cliente")
public class Client implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4310027227752446841L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String nit;
	private String t_documento;
	private String telefono;
	private String direccion;
	private String correo;
	private String estado;
	private String valor_credito;
	private String fecha_credito;
	private String ciudaddane;
	private String ciudad;
	
	public String getName() {
		return nombre;
	}
	public void setName(String name) {
		this.nombre = name;
	}
	public String getDocument() {
		return nit;
	}
	public void setDocument(String document) {
		this.nit = document;
	}
	public String getT_document() {
		return t_documento;
	}
	public void setT_document(String t_document) {
		this.t_documento = t_document;
	}
	public String getPhone() {
		return telefono;
	}
	public void setPhone(String phone) {
		this.telefono = phone;
	}
	public String getAddress() {
		return direccion;
	}
	public void setAddress(String address) {
		this.direccion = address;
	}
	public String getEmail() {
		return correo;
	}
	public void setEmail(String email) {
		this.correo = email;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getValor_credito() {
		return valor_credito;
	}
	public void setValor_credito (String valor_credito) {
		this.valor_credito = valor_credito;
	}
	public String getFecha_credito() {
		return fecha_credito;
	}
	public void setFecha_credito(String fecha_credito) {
		this.fecha_credito = fecha_credito;
	}
	public String getDepartamento() {
		return ciudaddane;
	}
	public void setDepartamento(String departamento) {
		this.ciudaddane = departamento;
	}
	public String getCiudad() {
		return ciudad;
	}
	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}
	

}

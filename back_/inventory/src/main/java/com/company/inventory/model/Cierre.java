package com.company.inventory.model;

import lombok.Data;

@Data
public class Cierre{

	private String fechadesdevar;
	private String fechahastavar;
	private int credito;
	private int efectivo;
	private int transferencia;
	private int tarjeta;
	private int nequi;
	private int daviplata;
	private int abonosefectivo;
	private int abonostransferencia;
	private int abonostarjeta;
	private int mini;
	private int maxi; 
	private int cont;
	private int base; 
	private int entrada;
	private int salida;
	private int devolucion;
	private int facturas_anuladas;
	private int pasamanos;
	private int notacredito;
    private String emp;
    private String emp1;
    private String emp2;
    private String nomemp;
    private String nite;
    private String direccion;
    private String tel1;
    private String tel2;
    private String usuario;
    private int saldo_caja;
    
	public Cierre(String fechadesdevar, String fechahastavar, int credito, int efectivo, int transferencia, int tarjeta,
			int nequi, int daviplata, int abonosefectivo, int abonostransferencia, int abonostarjeta, int mini,
			int maxi, int cont, int base, int entrada, int salida, int devolucion, int facturas_anuladas, int pasamanos,
			int notacredito, String emp, String emp1, String emp2, String nomemp, String nite, String direccion,
			String tel1, String tel2, String usuario, int saldo_caja) {
		super();
		this.fechadesdevar = fechadesdevar;
		this.fechahastavar = fechahastavar;
		this.credito = credito;
		this.efectivo = efectivo;
		this.transferencia = transferencia;
		this.tarjeta = tarjeta;
		this.nequi = nequi;
		this.daviplata = daviplata;
		this.abonosefectivo = abonosefectivo;
		this.abonostransferencia = abonostransferencia;
		this.abonostarjeta = abonostarjeta;
		this.mini = mini;
		this.maxi = maxi;
		this.cont = cont;
		this.base = base;
		this.entrada = entrada;
		this.salida = salida;
		this.devolucion = devolucion;
		this.facturas_anuladas = facturas_anuladas;
		this.pasamanos = pasamanos;
		this.notacredito = notacredito;
		this.emp = emp;
		this.emp1 = emp1;
		this.emp2 = emp2;
		this.nomemp = nomemp;
		this.nite = nite;
		this.direccion = direccion;
		this.tel1 = tel1;
		this.tel2 = tel2;
		this.usuario = usuario;
		this.saldo_caja = saldo_caja;
	}
}


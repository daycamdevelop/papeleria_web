package com.company.inventory.response;

import java.util.List;

import com.company.inventory.model.FacturaElectronicaPDF;

import lombok.Data;

@Data
public class FacturaElectronicaPDFResponse {
	
	List<FacturaElectronicaPDF> factura_electronicaPDF;
}


package com.company.inventory.response;

import java.util.List;

import com.company.inventory.model.FacturaPDF;

import lombok.Data;

@Data
public class FacturaPDFResponse {
	
	List<FacturaPDF> facturaPDF;
}


package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Factura;

import lombok.Data;

@Data
public class FacturaResponse {
	
	List<Factura> factura;
}


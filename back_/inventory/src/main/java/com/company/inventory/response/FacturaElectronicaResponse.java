package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.FacturaElectronica;

import lombok.Data;

@Data
public class FacturaElectronicaResponse {
	
	List<FacturaElectronica> facturaElectronica;
}


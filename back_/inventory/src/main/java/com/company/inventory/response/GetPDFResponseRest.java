package com.company.inventory.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetPDFResponseRest extends _ResponseRest{
	private FacturaPDFResponse facturaPDFResponse = new FacturaPDFResponse(); 
	private FacturaElectronicaPDFResponse factura_electronicaPDFResponse = new FacturaElectronicaPDFResponse();
	private PosElectronicoPDFResponse pos_electronicoPDFResponse = new PosElectronicoPDFResponse();
}

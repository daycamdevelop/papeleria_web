package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Factura;
import com.company.inventory.response.FacturaResponseRest;

public interface IFacturaService {
	
	public ResponseEntity<FacturaResponseRest> save(Factura factura);
	public ResponseEntity<FacturaResponseRest> searchById(Long id);	
	//public ResponseEntity<FacturaResponseRest> searchByDocument(String document);	
	public ResponseEntity<FacturaResponseRest> deleteById(Long id);
	public ResponseEntity<FacturaResponseRest> search();
	public ResponseEntity<FacturaResponseRest> update(Factura factura, Long id);

}

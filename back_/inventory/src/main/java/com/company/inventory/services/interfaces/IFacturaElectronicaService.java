package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.FacturaElectronica;
import com.company.inventory.response.FacturaElectronicaResponseRest;

public interface IFacturaElectronicaService {
	
	public ResponseEntity<FacturaElectronicaResponseRest> save(FacturaElectronica facturaElectronica);
	public ResponseEntity<FacturaElectronicaResponseRest> searchById(Long id);	
	//public ResponseEntity<FacturaElectronicaResponseRest> searchByDocument(String document);	
	public ResponseEntity<FacturaElectronicaResponseRest> deleteById(Long id);
	public ResponseEntity<FacturaElectronicaResponseRest> search();
	public ResponseEntity<FacturaElectronicaResponseRest> update(FacturaElectronica facturaElectronica, Long id);

}

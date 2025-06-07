package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Bodega;
import com.company.inventory.response.BodegaResponseRest;

public interface IBodegaService {
	
	public ResponseEntity<BodegaResponseRest> save(Bodega bodega);
	public ResponseEntity<BodegaResponseRest> searchById(Long id);	
	//public ResponseEntity<BodegaResponseRest> searchByDocument(String document);	
	public ResponseEntity<BodegaResponseRest> deleteById(Long id);
	public ResponseEntity<BodegaResponseRest> search();
	public ResponseEntity<BodegaResponseRest> update(Bodega bodega, Long id);

}

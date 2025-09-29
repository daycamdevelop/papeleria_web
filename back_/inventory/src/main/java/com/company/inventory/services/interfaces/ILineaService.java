package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Linea;
import com.company.inventory.response.LineaResponseRest;

public interface ILineaService {
	
	public ResponseEntity<LineaResponseRest> save(Linea linea);
	public ResponseEntity<LineaResponseRest> searchById(Long id);	
	//public ResponseEntity<LineaResponseRest> searchByDocument(String document);	
	public ResponseEntity<LineaResponseRest> deleteById(Long id);
	public ResponseEntity<LineaResponseRest> search();
	public ResponseEntity<LineaResponseRest> update(Linea linea, Long id);

}

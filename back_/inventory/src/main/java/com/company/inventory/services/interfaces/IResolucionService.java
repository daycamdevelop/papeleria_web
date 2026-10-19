package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Resolucion;
import com.company.inventory.response.ResolucionResponseRest;

public interface IResolucionService {
	
	public ResponseEntity<ResolucionResponseRest> save(Resolucion resolucion);
	public ResponseEntity<ResolucionResponseRest> searchById(Long id);	
	//public ResponseEntity<ResolucionResponseRest> searchByDocument(String document);	
	public ResponseEntity<ResolucionResponseRest> deleteById(Long id);
	public ResponseEntity<ResolucionResponseRest> search();
	public ResponseEntity<ResolucionResponseRest> update(Resolucion resolucion, Long id);

}

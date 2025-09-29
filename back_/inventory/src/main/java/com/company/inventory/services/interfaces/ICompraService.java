package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Compra;
import com.company.inventory.response.CompraResponseRest;

public interface ICompraService {
	
	public ResponseEntity<CompraResponseRest> save(Compra compra);
	public ResponseEntity<CompraResponseRest> searchById(Long id);	
	//public ResponseEntity<CompraResponseRest> searchByDocument(String document);	
	public ResponseEntity<CompraResponseRest> deleteById(Long id);
	public ResponseEntity<CompraResponseRest> search();
	public ResponseEntity<CompraResponseRest> update(Compra compra, Long id);

}

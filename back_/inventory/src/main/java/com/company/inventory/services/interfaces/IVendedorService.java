package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Vendedor;
import com.company.inventory.response.VendedorResponseRest;

public interface IVendedorService {
	public ResponseEntity<VendedorResponseRest> search();	
	public ResponseEntity<VendedorResponseRest> searchById(Long id);	
	public ResponseEntity<VendedorResponseRest> save(Vendedor category);
	public ResponseEntity<VendedorResponseRest> update(Vendedor category, Long id);
	public ResponseEntity<VendedorResponseRest> deleteById(Long id);
}

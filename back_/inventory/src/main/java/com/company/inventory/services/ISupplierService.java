package com.company.inventory.services;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Supplier;
import com.company.inventory.response.SupplierResponseRest;

public interface ISupplierService {
	
	public ResponseEntity<SupplierResponseRest> save(Supplier supplier);
	public ResponseEntity<SupplierResponseRest> searchById(Long id);	
	//public ResponseEntity<ClientResponseRest> searchByDocument(String document);	
	public ResponseEntity<SupplierResponseRest> deleteById(Long id);
	public ResponseEntity<SupplierResponseRest> search();
	public ResponseEntity<SupplierResponseRest> update(Supplier supplier, Long id);

}

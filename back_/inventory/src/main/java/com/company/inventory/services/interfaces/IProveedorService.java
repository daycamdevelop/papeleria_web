package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Proveedor;
import com.company.inventory.response.ProveedorResponseRest;

public interface IProveedorService {
	
	public ResponseEntity<ProveedorResponseRest> save(Proveedor proveedor);
	public ResponseEntity<ProveedorResponseRest> searchById(Long id);
	//public ResponseEntity<ProveedorResponseRest> searchByDocument(String document);
	public ResponseEntity<ProveedorResponseRest> deleteById(Long id);
	public ResponseEntity<ProveedorResponseRest> search();
	public ResponseEntity<ProveedorResponseRest> update(Proveedor proveedor, Long id);

}

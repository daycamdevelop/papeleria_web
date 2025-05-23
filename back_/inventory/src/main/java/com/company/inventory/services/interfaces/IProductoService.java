package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Producto;
import com.company.inventory.response.ProductoResponseRest;

public interface IProductoService {
	
	public ResponseEntity<ProductoResponseRest> save(Producto producto);
	public ResponseEntity<ProductoResponseRest> searchById(Long id);	
	//public ResponseEntity<ProductoResponseRest> searchByDocument(String document);	
	public ResponseEntity<ProductoResponseRest> deleteById(Long id);
	public ResponseEntity<ProductoResponseRest> search();
	public ResponseEntity<ProductoResponseRest> update(Producto producto, Long id);

}

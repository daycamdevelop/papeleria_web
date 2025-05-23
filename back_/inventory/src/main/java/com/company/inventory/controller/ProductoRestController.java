package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.company.inventory.model.Producto;
import com.company.inventory.response.ProductoResponseRest;
import com.company.inventory.services.interfaces.IProductoService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class ProductoRestController {
	
	@Autowired
	private IProductoService productoService;
	
	@PostMapping("/producto")
	public ResponseEntity<ProductoResponseRest> save(@RequestBody Producto producto) {
	    ResponseEntity<ProductoResponseRest> response = productoService.save(producto);
	    return response;
	}
	
	@GetMapping("/producto/{id}")
	public ResponseEntity<ProductoResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<ProductoResponseRest> response = productoService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/producto/{id}")
	public ResponseEntity<ProductoResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<ProductoResponseRest> response =  productoService.deleteById(id);
		return response;
	}
	
	@GetMapping("/producto")
	public ResponseEntity<ProductoResponseRest> searchClient(){
		ResponseEntity<ProductoResponseRest> response = productoService.search();
		return response;
	}
	
	@PutMapping("/producto/{id}")
	public ResponseEntity<ProductoResponseRest> update(@RequestBody Producto producto, @PathVariable Long id){
		ResponseEntity<ProductoResponseRest> response = productoService.update(producto, id);
		return response;
	}
	
	/*@GetMapping("/producto/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


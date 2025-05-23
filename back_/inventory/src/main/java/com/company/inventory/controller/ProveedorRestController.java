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


import com.company.inventory.model.Proveedor;
import com.company.inventory.response.ProveedorResponseRest;
import com.company.inventory.services.interfaces.IProveedorService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class ProveedorRestController {
	
	@Autowired
	private IProveedorService proveedorService;
	
	@PostMapping("/proveedor")
	public ResponseEntity<ProveedorResponseRest> save(@RequestBody Proveedor proveedor) {
	    ResponseEntity<ProveedorResponseRest> response = proveedorService.save(proveedor);
	    return response;
	}
	
	@GetMapping("/proveedor/{id}")
	public ResponseEntity<ProveedorResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<ProveedorResponseRest> response = proveedorService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/proveedor/{id}")
	public ResponseEntity<ProveedorResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<ProveedorResponseRest> response =  proveedorService.deleteById(id);
		return response;
	}
	
	@GetMapping("/proveedor")
	public ResponseEntity<ProveedorResponseRest> searchClient(){
		ResponseEntity<ProveedorResponseRest> response = proveedorService.search();
		return response;
	}
	
	@PutMapping("/proveedor/{id}")
	public ResponseEntity<ProveedorResponseRest> update(@RequestBody Proveedor proveedor, @PathVariable Long id){
		ResponseEntity<ProveedorResponseRest> response = proveedorService.update(proveedor, id);
		return response;
	}
	
	/*@GetMapping("/proveedor/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


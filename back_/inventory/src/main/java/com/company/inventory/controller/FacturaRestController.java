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


import com.company.inventory.model.Factura;
import com.company.inventory.response.FacturaResponseRest;
import com.company.inventory.services.interfaces.IFacturaService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class FacturaRestController {
	
	@Autowired
	private IFacturaService facturaService;
	
	@PostMapping("/factura")
	public ResponseEntity<FacturaResponseRest> save(@RequestBody Factura factura) {
	    ResponseEntity<FacturaResponseRest> response = facturaService.save(factura);
	    return response;
	}
	
	@GetMapping("/factura/{id}")
	public ResponseEntity<FacturaResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<FacturaResponseRest> response = facturaService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/factura/{id}")
	public ResponseEntity<FacturaResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<FacturaResponseRest> response =  facturaService.deleteById(id);
		return response;
	}
	
	@GetMapping("/factura")
	public ResponseEntity<FacturaResponseRest> searchClient(){
		ResponseEntity<FacturaResponseRest> response = facturaService.search();
		return response;
	}
	
	@PutMapping("/factura/{id}")
	public ResponseEntity<FacturaResponseRest> update(@RequestBody Factura factura, @PathVariable Long id){
		ResponseEntity<FacturaResponseRest> response = facturaService.update(factura, id);
		return response;
	}
	
	/*@GetMapping("/factura/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


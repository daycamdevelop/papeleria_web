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


import com.company.inventory.model.Compra;
import com.company.inventory.response.CompraResponseRest;
import com.company.inventory.services.interfaces.ICompraService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class CompraRestController {
	
	@Autowired
	private ICompraService compraService;
	
	@PostMapping("/compra")
	public ResponseEntity<CompraResponseRest> save(@RequestBody Compra compra) {
	    ResponseEntity<CompraResponseRest> response = compraService.save(compra);
	    return response;
	}
	
	@GetMapping("/compra/{id}")
	public ResponseEntity<CompraResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<CompraResponseRest> response = compraService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/compra/{id}")
	public ResponseEntity<CompraResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<CompraResponseRest> response =  compraService.deleteById(id);
		return response;
	}
	
	@GetMapping("/compra")
	public ResponseEntity<CompraResponseRest> searchClient(){
		ResponseEntity<CompraResponseRest> response = compraService.search();
		return response;
	}
	
	@PutMapping("/compra/{id}")
	public ResponseEntity<CompraResponseRest> update(@RequestBody Compra compra, @PathVariable Long id){
		ResponseEntity<CompraResponseRest> response = compraService.update(compra, id);
		return response;
	}
	
	/*@GetMapping("/compra/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


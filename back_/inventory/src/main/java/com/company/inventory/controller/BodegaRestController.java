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


import com.company.inventory.model.Bodega;
import com.company.inventory.response.BodegaResponseRest;
import com.company.inventory.services.interfaces.IBodegaService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class BodegaRestController {
	
	@Autowired
	private IBodegaService bodegaService;
	
	@PostMapping("/bodega")
	public ResponseEntity<BodegaResponseRest> save(@RequestBody Bodega bodega) {
	    ResponseEntity<BodegaResponseRest> response = bodegaService.save(bodega);
	    return response;
	}
	
	@GetMapping("/bodega/{id}")
	public ResponseEntity<BodegaResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<BodegaResponseRest> response = bodegaService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/bodega/{id}")
	public ResponseEntity<BodegaResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<BodegaResponseRest> response =  bodegaService.deleteById(id);
		return response;
	}
	
	@GetMapping("/bodega")
	public ResponseEntity<BodegaResponseRest> searchClient(){
		ResponseEntity<BodegaResponseRest> response = bodegaService.search();
		return response;
	}
	
	@PutMapping("/bodega/{id}")
	public ResponseEntity<BodegaResponseRest> update(@RequestBody Bodega bodega, @PathVariable Long id){
		ResponseEntity<BodegaResponseRest> response = bodegaService.update(bodega, id);
		return response;
	}
	
	/*@GetMapping("/bodega/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


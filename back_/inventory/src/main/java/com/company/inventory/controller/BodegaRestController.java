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

/*
import com.company.inventory.model.bodega;
import com.company.inventory.response.bodegaResponseRest;
import com.company.inventory.services.interfaces.IbodegaService;*/

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class BodegaRestController {
	/*
	@Autowired
	private IbodegaService bodegaService;
	
	@PostMapping("/bodega")
	public ResponseEntity<bodegaResponseRest> save(@RequestBody bodega bodega) {
	    ResponseEntity<bodegaResponseRest> response = bodegaService.save(bodega);
	    return response;
	}
	
	@GetMapping("/bodega/{id}")
	public ResponseEntity<bodegaResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<bodegaResponseRest> response = bodegaService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/bodega/{id}")
	public ResponseEntity<bodegaResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<bodegaResponseRest> response =  bodegaService.deleteById(id);
		return response;
	}
	
	@GetMapping("/bodega")
	public ResponseEntity<bodegaResponseRest> searchClient(){
		ResponseEntity<bodegaResponseRest> response = bodegaService.search();
		return response;
	}
	
	@PutMapping("/bodega/{id}")
	public ResponseEntity<bodegaResponseRest> update(@RequestBody bodega bodega, @PathVariable Long id){
		ResponseEntity<bodegaResponseRest> response = bodegaService.update(bodega, id);
		return response;
	}
	
	/*@GetMapping("/bodega/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


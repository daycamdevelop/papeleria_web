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


import com.company.inventory.model.Linea;
import com.company.inventory.response.LineaResponseRest;
import com.company.inventory.services.interfaces.ILineaService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class LineaRestController {
	
	@Autowired
	private ILineaService LineaService;
	
	@PostMapping("/linea")
	public ResponseEntity<LineaResponseRest> save(@RequestBody Linea linea) {
	    ResponseEntity<LineaResponseRest> response = LineaService.save(linea);
	    return response;
	}
	
	@GetMapping("/linea/{id}")
	public ResponseEntity<LineaResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<LineaResponseRest> response = LineaService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/linea/{id}")
	public ResponseEntity<LineaResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<LineaResponseRest> response =  LineaService.deleteById(id);
		return response;
	}
	
	@GetMapping("/linea")
	public ResponseEntity<LineaResponseRest> searchClient(){
		ResponseEntity<LineaResponseRest> response = LineaService.search();
		return response;
	}
	
	@PutMapping("/linea/{id}")
	public ResponseEntity<LineaResponseRest> update(@RequestBody Linea linea, @PathVariable Long id){
		ResponseEntity<LineaResponseRest> response = LineaService.update(linea, id);
		return response;
	}
	
	/*@GetMapping("/linea/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


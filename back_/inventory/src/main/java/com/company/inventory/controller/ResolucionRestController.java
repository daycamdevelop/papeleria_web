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


import com.company.inventory.model.Resolucion;
import com.company.inventory.response.ResolucionResponseRest;
import com.company.inventory.services.interfaces.IResolucionService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class ResolucionRestController {
	
	@Autowired
	private IResolucionService resolucionService;
	
	@PostMapping("/resolucion")
	public ResponseEntity<ResolucionResponseRest> save(@RequestBody Resolucion resolucion) {
	    ResponseEntity<ResolucionResponseRest> response = resolucionService.save(resolucion);
	    return response;
	}
	
	@GetMapping("/resolucion/{id}")
	public ResponseEntity<ResolucionResponseRest> searchResolucionById(@PathVariable Long id){
		ResponseEntity<ResolucionResponseRest> response = resolucionService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/resolucion/{id}")
	public ResponseEntity<ResolucionResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<ResolucionResponseRest> response =  resolucionService.deleteById(id);
		return response;
	}
	
	@GetMapping("/resolucion")
	public ResponseEntity<ResolucionResponseRest> searchResolucion(){
		ResponseEntity<ResolucionResponseRest> response = resolucionService.search();
		return response;
	}
	
	@PutMapping("/resolucion/{id}")
	public ResponseEntity<ResolucionResponseRest> update(@RequestBody Resolucion resolucion, @PathVariable Long id){
		ResponseEntity<ResolucionResponseRest> response = resolucionService.update(resolucion, id);
		return response;
	}
	
	/*@GetMapping("/resolucion/{document}")
	public ResponseEntity<ResolucionResponseRest> searchResolucionByDocument(@PathVariable String document){
		ResponseEntity<ResolucionResponseRest> response =  resolucionService.searchByDocument(document);
		return response;
	}
*/
}


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


import com.company.inventory.model.Parametros;
import com.company.inventory.response.ParametrosResponseRest;
import com.company.inventory.services.interfaces.IParametrosService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class ParametrosRestController {
	
	@Autowired
	private IParametrosService parametrosService;
	
	@PostMapping("/parametros")
	public ResponseEntity<ParametrosResponseRest> save(@RequestBody Parametros parametros) {
	    ResponseEntity<ParametrosResponseRest> response = parametrosService.save(parametros);
	    return response;
	}
	
	@GetMapping("/parametros/{id}")
	public ResponseEntity<ParametrosResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<ParametrosResponseRest> response = parametrosService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/parametros/{id}")
	public ResponseEntity<ParametrosResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<ParametrosResponseRest> response =  parametrosService.deleteById(id);
		return response;
	}
	
	@GetMapping("/parametros")
	public ResponseEntity<ParametrosResponseRest> searchClient(){
		ResponseEntity<ParametrosResponseRest> response = parametrosService.search();
		return response;
	}
	
	@PutMapping("/parametros/{id}")
	public ResponseEntity<ParametrosResponseRest> update(@RequestBody Parametros parametros, @PathVariable Long id){
		ResponseEntity<ParametrosResponseRest> response = parametrosService.update(parametros, id);
		return response;
	}
}


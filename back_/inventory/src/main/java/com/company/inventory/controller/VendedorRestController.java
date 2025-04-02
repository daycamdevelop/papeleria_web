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

import com.company.inventory.model.Vendedor;
import com.company.inventory.response.VendedorResponseRest;
import com.company.inventory.services.interfaces.IVendedorService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class VendedorRestController {
	
	@Autowired
	private IVendedorService service;
	
	@GetMapping("/vendedor")
	public ResponseEntity<VendedorResponseRest> searchCategories(){
		ResponseEntity<VendedorResponseRest> response =  service.search();
		return response;
	}
	
	@GetMapping("/vendedor/{id}")
	public ResponseEntity<VendedorResponseRest> searchCategoriesById(@PathVariable Long id){
		ResponseEntity<VendedorResponseRest> response =  service.searchById(id);
		return response;
	}
	
	@PostMapping("/vendedor")
	public ResponseEntity<VendedorResponseRest> save(@RequestBody Vendedor category){
		ResponseEntity<VendedorResponseRest> response =  service.save(category);
		return response;
	}
	
	@PutMapping("/vendedor/{id}")
	public ResponseEntity<VendedorResponseRest> update(@RequestBody Vendedor category, @PathVariable Long id){
		ResponseEntity<VendedorResponseRest> response =  service.update(category, id);
		return response;
	}
	
	@DeleteMapping("/vendedor/{id}")
	public ResponseEntity<VendedorResponseRest> delete(@PathVariable Long id){
		ResponseEntity<VendedorResponseRest> response =  service.deleteById(id);
		return response;
	}
}

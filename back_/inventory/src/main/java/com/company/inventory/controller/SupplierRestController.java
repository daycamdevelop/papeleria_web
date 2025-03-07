package com.company.inventory.controller;

import java.io.IOException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.company.inventory.model.Supplier;
import com.company.inventory.response.SupplierResponseRest;
import com.company.inventory.services.ISupplierService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class SupplierRestController {
	
	@Autowired
	private ISupplierService supplierService;
	
	/**
	 * 	 
	 * @param client
	 * @return
	 */
	@PostMapping("/supplier")
	public ResponseEntity<SupplierResponseRest> save(@RequestBody Supplier supplier) {
	    ResponseEntity<SupplierResponseRest> response = supplierService.save(supplier);
	    return response;
	}

	
	/**
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/supplier/{id}")
	public ResponseEntity<SupplierResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<SupplierResponseRest> response = supplierService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/supplier/{id}")
	public ResponseEntity<SupplierResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<SupplierResponseRest> response =  supplierService.deleteById(id);
		return response;
	}
	
	/**
	 * 
	 * @return
	 */
	@GetMapping("/supplier")
	public ResponseEntity<SupplierResponseRest> searchClient(){
		ResponseEntity<SupplierResponseRest> response = supplierService.search();
		return response;
	}
	
	/**
	 * 
	 * @param supplier
	 * @param id
	 * @return
	 */
	@PutMapping("/supplier/{id}")
	public ResponseEntity<SupplierResponseRest> update(@RequestBody Supplier supplier, @PathVariable Long id){
		ResponseEntity<SupplierResponseRest> response = supplierService.update(supplier, id);
		return response;
	}
	
	
	
	/**
	 * 
	 * @param document
	 * @return
	 */
	/*@GetMapping("/client/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}


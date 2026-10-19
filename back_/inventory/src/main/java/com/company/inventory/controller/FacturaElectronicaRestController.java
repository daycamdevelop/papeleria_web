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

import com.company.inventory.model.FacturaElectronica;
import com.company.inventory.response.FacturaElectronicaResponseRest;
import com.company.inventory.services.interfaces.IFacturaElectronicaService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class FacturaElectronicaRestController {
	
	@Autowired
	private IFacturaElectronicaService facturaElectronicaService;
	
	@PostMapping("/factura_electronica")
	public ResponseEntity<FacturaElectronicaResponseRest> save(@RequestBody FacturaElectronica factura_electronica) {
	    ResponseEntity<FacturaElectronicaResponseRest> response = facturaElectronicaService.save(factura_electronica);
	    return response;
	}
	
	@GetMapping("/factura_electronica/{id}")
	public ResponseEntity<FacturaElectronicaResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<FacturaElectronicaResponseRest> response = facturaElectronicaService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/factura_electronica/{id}")
	public ResponseEntity<FacturaElectronicaResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<FacturaElectronicaResponseRest> response =  facturaElectronicaService.deleteById(id);
		return response;
	}
	
	@GetMapping("/factura_electronica")
	public ResponseEntity<FacturaElectronicaResponseRest> searchClient(){
		ResponseEntity<FacturaElectronicaResponseRest> response = facturaElectronicaService.search();
		return response;
	}
	
	@PutMapping("/factura_electronica/{id}")
	public ResponseEntity<FacturaElectronicaResponseRest> update(@RequestBody FacturaElectronica facturaElectronica, @PathVariable Long id){
		ResponseEntity<FacturaElectronicaResponseRest> response = facturaElectronicaService.update(facturaElectronica, id);
		return response;
	}
	
	/*@GetMapping("/factura_electronica/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}

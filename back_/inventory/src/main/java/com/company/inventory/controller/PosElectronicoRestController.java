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

import com.company.inventory.model.PosElectronico;
import com.company.inventory.response.PosElectronicoResponseRest;
import com.company.inventory.services.interfaces.IPosElectronicoService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class PosElectronicoRestController {
	
	@Autowired
	private IPosElectronicoService posElectronicoService;
	
	@PostMapping("/pos_electronico")
	public ResponseEntity<PosElectronicoResponseRest> save(@RequestBody PosElectronico pos_electronico) {
	    ResponseEntity<PosElectronicoResponseRest> response = posElectronicoService.save(pos_electronico);
	    return response;
	}
	
	@GetMapping("/pos_electronico/{id}")
	public ResponseEntity<PosElectronicoResponseRest> searchSupplierById(@PathVariable Long id){
		ResponseEntity<PosElectronicoResponseRest> response = posElectronicoService.searchById(id);
		return response;
	}
	
	@DeleteMapping("/pos_electronico/{id}")
	public ResponseEntity<PosElectronicoResponseRest> deleteById(@PathVariable Long id){
		ResponseEntity<PosElectronicoResponseRest> response =  posElectronicoService.deleteById(id);
		return response;
	}
	
	@GetMapping("/pos_electronico")
	public ResponseEntity<PosElectronicoResponseRest> searchClient(){
		ResponseEntity<PosElectronicoResponseRest> response = posElectronicoService.search();
		return response;
	}
	
	@PutMapping("/pos_electronico/{id}")
	public ResponseEntity<PosElectronicoResponseRest> update(@RequestBody PosElectronico posElectronico, @PathVariable Long id){
		ResponseEntity<PosElectronicoResponseRest> response = posElectronicoService.update(posElectronico, id);
		return response;
	}
	
	/*@GetMapping("/pos_electronico/{document}")
	public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document){
		ResponseEntity<ClientResponseRest> response =  clientService.searchByDocument(document);
		return response;
	}
*/
}

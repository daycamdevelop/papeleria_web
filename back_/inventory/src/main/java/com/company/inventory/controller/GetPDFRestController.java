package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.inventory.repository.IFacturaPDFRepository;
import com.company.inventory.response.GetPDFResponseRest;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class GetPDFRestController {
	
	@Autowired
	private IFacturaPDFRepository facturaPDFRepository; 
	
	@GetMapping("/facturaPDF")
	public ResponseEntity<GetPDFResponseRest> facturaPDF(
			@RequestParam int numerofactura
	        ) {
	    ResponseEntity<GetPDFResponseRest> response = facturaPDFRepository.facturaPDF(numerofactura);
	    return response;
	}
	
	@GetMapping("/factura_electronicaPDF")
	public ResponseEntity<GetPDFResponseRest> factura_electronicaPDF(
			@RequestParam int numerofactura
	        ) {
	    ResponseEntity<GetPDFResponseRest> response = facturaPDFRepository.factura_electronicaPDF(numerofactura);
	    return response;
	}
}


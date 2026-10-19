package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.inventory.repository.ICierreRepository;
import com.company.inventory.response.CierreResponseRest;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class CierreRestController {
	
	@Autowired
	private ICierreRepository cierreRepository;
	
	@GetMapping("/cierre")
	public ResponseEntity<CierreResponseRest> cierre(
			@RequestParam String fechaInicio,
	        @RequestParam String fechaFin
	        ) {
	    ResponseEntity<CierreResponseRest> response = cierreRepository.cierre(fechaInicio, fechaFin);
	    return response;
	}
}


package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.inventory.repository.IInventarioRepository;
import com.company.inventory.response.InventarioResponseRest;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class InventarioRestController {
	
	@Autowired
	private IInventarioRepository inventarioRepository;
	
	@GetMapping("/inventario")
	public ResponseEntity<InventarioResponseRest> inventario(
			@RequestParam int bodega,
	        @RequestParam int linea
	        ) {
	    ResponseEntity<InventarioResponseRest> response = inventarioRepository.inventario(bodega, linea);
	    return response;
	}
}


package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.inventory.repository.IKardexRepository;
import com.company.inventory.response.KardexResponseRest;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class KardexRestController {
	
	@Autowired
	private IKardexRepository kardexRepository;
	
	@GetMapping("/kardex")
	public ResponseEntity<KardexResponseRest> ingresos_egresos(
			@RequestParam String codigoSel,
			@RequestParam String fechaInicio
	        ) {
	    ResponseEntity<KardexResponseRest> response = kardexRepository.kardex(codigoSel, fechaInicio);
	    return response;
	}
}


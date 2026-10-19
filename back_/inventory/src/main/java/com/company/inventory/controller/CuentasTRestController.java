package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.inventory.repository.ICuentasTRepository;
import com.company.inventory.response.CuentasTResponseRest;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class CuentasTRestController {
	
	@Autowired
	private ICuentasTRepository cuentas_tRepository;/*
	@Autowired
	private ICuentasTService cuentasTService;*/
	
	@GetMapping("/cuentas_t")
	public ResponseEntity<CuentasTResponseRest> ingresos_egresos(
			@RequestParam int usuario
	        ) {
	    ResponseEntity<CuentasTResponseRest> response = cuentas_tRepository.ingresos_egresos(usuario);
	    return response;
	}
	/*
	@PostMapping("/cuentas_t")
	public ResponseEntity<CuentasTResponseRest> save(@RequestBody CuentasT cuentasT) {
	    ResponseEntity<CuentasTResponseRest> response = cuentasTService.save(cuentasT);
	    return response;
	}*/
}


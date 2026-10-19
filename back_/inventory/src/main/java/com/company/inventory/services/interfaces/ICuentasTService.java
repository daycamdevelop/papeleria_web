package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.CuentasT;
import com.company.inventory.response.CuentasTResponseRest;

public interface ICuentasTService {
	
	public ResponseEntity<CuentasTResponseRest> save(CuentasT cuentasT);

}

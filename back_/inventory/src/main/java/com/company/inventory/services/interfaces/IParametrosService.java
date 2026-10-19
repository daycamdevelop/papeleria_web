package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.Parametros;
import com.company.inventory.response.ParametrosResponseRest;

public interface IParametrosService {
	
	public ResponseEntity<ParametrosResponseRest> save(Parametros parametros);
	public ResponseEntity<ParametrosResponseRest> searchById(Long id);
	public ResponseEntity<ParametrosResponseRest> deleteById(Long id);
	public ResponseEntity<ParametrosResponseRest> search();
	public ResponseEntity<ParametrosResponseRest> update(Parametros parametros, Long id);

}

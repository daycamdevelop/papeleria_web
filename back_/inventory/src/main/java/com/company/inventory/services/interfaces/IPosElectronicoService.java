package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;

import com.company.inventory.model.PosElectronico;
import com.company.inventory.response.PosElectronicoResponseRest;

public interface IPosElectronicoService {
	
	public ResponseEntity<PosElectronicoResponseRest> save(PosElectronico posElectronico);
	public ResponseEntity<PosElectronicoResponseRest> searchById(Long id);	
	//public ResponseEntity<PosElectronicoResponseRest> searchByDocument(String document);	
	public ResponseEntity<PosElectronicoResponseRest> deleteById(Long id);
	public ResponseEntity<PosElectronicoResponseRest> search();
	public ResponseEntity<PosElectronicoResponseRest> update(PosElectronico posElectronico, Long id);

}

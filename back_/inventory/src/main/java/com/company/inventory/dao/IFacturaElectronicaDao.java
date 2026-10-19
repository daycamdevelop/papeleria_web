package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.FacturaElectronica;


public interface IFacturaElectronicaDao extends CrudRepository<FacturaElectronica, Long>{
	
}
package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.PosElectronico;


public interface IPosElectronicoDao extends CrudRepository<PosElectronico, Long>{
	
}
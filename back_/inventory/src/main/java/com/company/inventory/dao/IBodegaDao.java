package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Bodega;


public interface IBodegaDao extends CrudRepository<Bodega, Long>{
	
}


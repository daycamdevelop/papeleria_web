package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Linea;


public interface ILineaDao extends CrudRepository<Linea, Long>{
	
}


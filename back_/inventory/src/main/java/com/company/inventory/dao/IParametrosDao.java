package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Parametros;


public interface IParametrosDao extends CrudRepository<Parametros, Long>{
	
}
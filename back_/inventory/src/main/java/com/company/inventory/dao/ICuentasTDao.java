package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.CuentasT;


public interface ICuentasTDao extends CrudRepository<CuentasT, Long>{
	
}
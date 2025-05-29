package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Proveedor;


public interface IProveedorDao extends CrudRepository<Proveedor, Long>{
	
}


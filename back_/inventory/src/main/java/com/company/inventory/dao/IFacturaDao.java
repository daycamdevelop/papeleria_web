package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Factura;


public interface IFacturaDao extends CrudRepository<Factura, Long>{
	
}
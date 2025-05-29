package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Producto;


public interface IProductoDao extends CrudRepository<Producto, Long>{
	
}


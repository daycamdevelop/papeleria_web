package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Compra;


public interface ICompraDao extends CrudRepository<Compra, Long>{
	
}
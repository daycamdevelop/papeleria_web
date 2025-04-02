package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Vendedor;

public interface IVendedorDao extends CrudRepository<Vendedor, Long>{

}

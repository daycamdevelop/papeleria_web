package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Supplier;


public interface ISupplierDao extends CrudRepository<Supplier, Long>{
	
	/*
	@Query("select p from cliente p where p.document like %?1% ")
	List<Client> findByDocumentLike(String document);
	
	List<Client> findByDocumentContainingIgnoreCase(String document);
	*/

}


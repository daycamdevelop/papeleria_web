package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;

import com.company.inventory.model.Category;

public interface ICategoyDao extends CrudRepository<Category, Long>{

}

package com.company.inventory.dao;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.company.inventory.model.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long> {

    @Query(value = "SELECT * FROM cliente c where lower(c.nit) like lower(CONCAT('%', :nit, '%'));", nativeQuery = true)
    List<Cliente> findByNitLike(@Param("nit") String nit);
}

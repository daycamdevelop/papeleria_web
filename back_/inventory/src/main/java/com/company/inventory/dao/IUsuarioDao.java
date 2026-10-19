package com.company.inventory.dao;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.company.inventory.model.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long> {

    @Query(value = "SELECT * FROM usuario c where lower(c.nit) like lower(CONCAT('%', :nit, '%'));", nativeQuery = true)
    List<Usuario> findByNitLike(@Param("nit") String nit);
}

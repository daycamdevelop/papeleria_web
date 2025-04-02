package com.company.inventory.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.company.inventory.model.Client;

public interface IClientDao extends CrudRepository<Client, Long> {
    /*Optional<Client> findByDocument(String nit);

    @Query("SELECT * FROM cliente c where lower(c.nit) like lower('%'|| ':nit' ||'%');")
    List<Client> findByDocumentLike(@Param("nit") String nit);*/
}

package com.company.inventory.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.company.inventory.model.Client;

public interface IClientDao extends CrudRepository<Client, Long> {
    Optional<Client> findByDocument(String document);

    @Query("SELECT c FROM Client c WHERE LOWER(c.document) LIKE LOWER(CONCAT('%', :document, '%'))")
    List<Client> findByDocumentLike(@Param("document") String document);
}

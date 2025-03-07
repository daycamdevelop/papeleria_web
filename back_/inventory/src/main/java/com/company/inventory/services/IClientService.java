package com.company.inventory.services;

import org.springframework.http.ResponseEntity;
import com.company.inventory.model.Client;
import com.company.inventory.response.ClientResponseRest;

public interface IClientService {
    ResponseEntity<ClientResponseRest> save(Client client);
    ResponseEntity<ClientResponseRest> searchById(Long id);
    ResponseEntity<ClientResponseRest> searchByDocument(String document);
    ResponseEntity<ClientResponseRest> deleteById(Long id);
    ResponseEntity<ClientResponseRest> search();
    ResponseEntity<ClientResponseRest> update(Client client, Long id);
}

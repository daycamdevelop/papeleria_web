package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.inventory.model.Client;
import com.company.inventory.response.ClientResponseRest;
import com.company.inventory.services.IClientService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class ClientRestController {

    @Autowired
    private IClientService clientService;

    @PostMapping("/client")
    public ResponseEntity<ClientResponseRest> save(@RequestBody Client client) {
        return clientService.save(client);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<ClientResponseRest> searchClientById(@PathVariable Long id) {
        return clientService.searchById(id);
    }

    @GetMapping("/client/document/{document}")
    public ResponseEntity<ClientResponseRest> searchClientByDocument(@PathVariable String document) {
        return clientService.searchByDocument(document);
    }

    @DeleteMapping("/client/{id}")
    public ResponseEntity<ClientResponseRest> deleteById(@PathVariable Long id) {
        return clientService.deleteById(id);
    }

    @GetMapping("/client")
    public ResponseEntity<ClientResponseRest> searchClient() {
        return clientService.search();
    }

    @PutMapping("/client/{id}")
    public ResponseEntity<ClientResponseRest> update(@RequestBody Client client, @PathVariable Long id) {
        return clientService.update(client, id);
    }
}

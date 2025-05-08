package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.inventory.model.Cliente;
import com.company.inventory.response.ClienteResponseRest;
import com.company.inventory.services.interfaces.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200", "https://papeleria-web-vn2s.onrender.com"})
@RestController
@RequestMapping("/api/v1")
public class ClienteRestController {

    @Autowired
    private IClienteService clientService;

    @PostMapping("/cliente")
    public ResponseEntity<ClienteResponseRest> save(@RequestBody Cliente client) {
        return clientService.save(client);
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<ClienteResponseRest> searchClientById(@PathVariable Long id) {
        return clientService.searchById(id);
    }

    @GetMapping("/cliente/nit/{nit}")
    public ResponseEntity<ClienteResponseRest> searchClientByDocument(@PathVariable String nit) {
        return clientService.searchByNit(nit);
    }

    @DeleteMapping("/cliente/{id}")
    public ResponseEntity<ClienteResponseRest> deleteById(@PathVariable Long id) {
        return clientService.deleteById(id);
    }

    @GetMapping("/cliente")
    public ResponseEntity<ClienteResponseRest> searchClient() {
        return clientService.search();
    }

    @PutMapping("/cliente/{id}")
    public ResponseEntity<ClienteResponseRest> update(@RequestBody Cliente client, @PathVariable Long id) {
        return clientService.update(client, id);
    }
}

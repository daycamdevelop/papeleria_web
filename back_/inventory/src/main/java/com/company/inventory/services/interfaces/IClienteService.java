package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;
import com.company.inventory.model.Cliente;
import com.company.inventory.response.ClienteResponseRest;

public interface IClienteService {
    ResponseEntity<ClienteResponseRest> save(Cliente cliente);
    ResponseEntity<ClienteResponseRest> searchById(Long id);
    ResponseEntity<ClienteResponseRest> searchByNit(String nit);
    ResponseEntity<ClienteResponseRest> deleteById(Long id);
    ResponseEntity<ClienteResponseRest> search();
    ResponseEntity<ClienteResponseRest> update(Cliente cliente, Long id);
}

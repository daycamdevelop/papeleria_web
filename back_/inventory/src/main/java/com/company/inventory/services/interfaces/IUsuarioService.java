package com.company.inventory.services.interfaces;

import org.springframework.http.ResponseEntity;
import com.company.inventory.model.Usuario;
import com.company.inventory.response.UsuarioResponseRest;

public interface IUsuarioService {
    ResponseEntity<UsuarioResponseRest> save(Usuario usuario);
    ResponseEntity<UsuarioResponseRest> searchById(Long id);
    ResponseEntity<UsuarioResponseRest> searchByNit(String nit);
    ResponseEntity<UsuarioResponseRest> deleteById(Long id);
    ResponseEntity<UsuarioResponseRest> search();
    ResponseEntity<UsuarioResponseRest> update(Usuario usuario, Long id);
}

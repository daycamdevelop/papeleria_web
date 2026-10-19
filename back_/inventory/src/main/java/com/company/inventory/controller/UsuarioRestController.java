package com.company.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.inventory.model.Usuario;
import com.company.inventory.response.UsuarioResponseRest;
import com.company.inventory.services.interfaces.IUsuarioService;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:8080", "https://daycamdevelop.github.io"})
@RestController
@RequestMapping("/api/v1")
public class UsuarioRestController {

    @Autowired
    private IUsuarioService usuarioService;

    @PostMapping("/usuario")
    public ResponseEntity<UsuarioResponseRest> save(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<UsuarioResponseRest> searchClientById(@PathVariable Long id) {
        return usuarioService.searchById(id);
    }

    @GetMapping("/usuario/nit/{nit}")
    public ResponseEntity<UsuarioResponseRest> searchClientByDocument(@PathVariable String nit) {
        return usuarioService.searchByNit(nit);
    }

    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<UsuarioResponseRest> deleteById(@PathVariable Long id) {
        return usuarioService.deleteById(id);
    }

    @GetMapping("/usuario")
    public ResponseEntity<UsuarioResponseRest> searchClient() {
        return usuarioService.search();
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<UsuarioResponseRest> update(@RequestBody Usuario usuario, @PathVariable Long id) {
        return usuarioService.update(usuario, id);
    }
}

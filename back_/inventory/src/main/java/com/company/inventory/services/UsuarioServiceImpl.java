package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.company.inventory.dao.IUsuarioDao;
import com.company.inventory.model.Usuario;
import com.company.inventory.response.UsuarioResponseRest;
import com.company.inventory.services.interfaces.IUsuarioService;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private IUsuarioDao usuarioDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UsuarioResponseRest> search() {
        UsuarioResponseRest response = new UsuarioResponseRest();
        try {
            List<Usuario> usuario = (List<Usuario>) usuarioDao.findAll();
            response.getUsuarioResponse().setUsuario(usuario);
            response.setMetadata(true, "200", "Consulta Correcta");
        } catch (Exception e) {
            response.setMetadata(true, "500", "Error en Consulta");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<UsuarioResponseRest> save(Usuario usuario) {
        UsuarioResponseRest response = new UsuarioResponseRest();
        try {
            Usuario usuarioSaved = usuarioDao.save(usuario);
            response.getUsuarioResponse().setUsuario(List.of(usuarioSaved));
            response.setMetadata(true, "200", "Usuario guardado exitosamente");
        } catch (Exception e) {
            response.setMetadata(true, "500", "Error al guardar el usuario");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UsuarioResponseRest> searchById(Long id) {
        UsuarioResponseRest response = new UsuarioResponseRest();
        try {
            Optional<Usuario> usuario = usuarioDao.findById(id);
            if (usuario.isPresent()) {
                response.getUsuarioResponse().setUsuario(List.of(usuario.get()));
                response.setMetadata(true, "200", "Usuario encontrado");
            } else {
                response.setMetadata(false, "404", "Usuario no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al buscar usuario por ID");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UsuarioResponseRest> searchByNit(String nit) {
        UsuarioResponseRest response = new UsuarioResponseRest();
        try {
            List<Usuario> usuarios = usuarioDao.findByNitLike(nit);
            if (!usuarios.isEmpty()) {
                response.getUsuarioResponse().setUsuario(usuarios);
                response.setMetadata(true, "200", "Usuarios encontrados");
            } else {
                response.setMetadata(false, "404", "No se encontraron usuarios");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al buscar usuarios");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<UsuarioResponseRest> deleteById(Long id) {
        UsuarioResponseRest response = new UsuarioResponseRest();
        try {
            usuarioDao.deleteById(id);
            response.setMetadata(true, "200", "Usuario eliminado");
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al eliminar el usuario");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<UsuarioResponseRest> update(Usuario usuario, Long id) {
        UsuarioResponseRest response = new UsuarioResponseRest();
        try {
            Optional<Usuario> usuarioSearch = usuarioDao.findById(id);
            if (usuarioSearch.isPresent()) {
                Usuario usuarioToUpdate = usuarioSearch.get();
                usuarioToUpdate.setNombres(usuario.getNombres());
                usuarioToUpdate.setApellidos(usuario.getApellidos());
                usuarioToUpdate.setTipo_documento(usuario.getTipo_documento());
                usuarioToUpdate.setNumero_documento(usuario.getNumero_documento());
                usuarioToUpdate.setUsuarionombre(usuario.getUsuarionombre());
                usuarioToUpdate.setPass(usuario.getPass());
                usuarioToUpdate.setEstado(usuario.getEstado());
                usuarioToUpdate.setRol(usuario.getRol());
                usuarioToUpdate.setDesvincular(usuario.getDesvincular());
                Usuario usuarioUpdated = usuarioDao.save(usuarioToUpdate);
                response.getUsuarioResponse().setUsuario(List.of(usuarioUpdated));
                response.setMetadata(true, "200", "Usuario actualizado");
            } else {
                response.setMetadata(false, "404", "Usuario no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al actualizar usuario");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

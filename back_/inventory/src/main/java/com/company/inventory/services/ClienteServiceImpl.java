package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.company.inventory.dao.IClienteDao;
import com.company.inventory.model.Cliente;
import com.company.inventory.response.ClienteResponseRest;
import com.company.inventory.services.interfaces.IClienteService;

@Service
public class ClienteServiceImpl implements IClienteService {

    @Autowired
    private IClienteDao clientDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClienteResponseRest> search() {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            List<Cliente> client = (List<Cliente>) clientDao.findAll();
            response.getClienteResponse().setCliente(client);
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
    public ResponseEntity<ClienteResponseRest> save(Cliente client) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            Cliente clientSaved = clientDao.save(client);
            response.getClienteResponse().setCliente(List.of(clientSaved));
            response.setMetadata(true, "200", "Cliente guardado exitosamente");
        } catch (Exception e) {
            response.setMetadata(true, "500", "Error al guardar el cliente");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClienteResponseRest> searchById(Long id) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            Optional<Cliente> client = clientDao.findById(id);
            if (client.isPresent()) {
                response.getClienteResponse().setCliente(List.of(client.get()));
                response.setMetadata(true, "200", "Cliente encontrado");
            } else {
                response.setMetadata(false, "404", "Cliente no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al buscar cliente por ID");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClienteResponseRest> searchByNit(String nit) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            List<Cliente> clients = clientDao.findByNitLike(nit);
            if (!clients.isEmpty()) {
                response.getClienteResponse().setCliente(clients);
                response.setMetadata(true, "200", "Clientes encontrados");
            } else {
                response.setMetadata(false, "404", "No se encontraron clientes");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al buscar clientes");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ClienteResponseRest> deleteById(Long id) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            clientDao.deleteById(id);
            response.setMetadata(true, "200", "Cliente eliminado");
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al eliminar el cliente");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ClienteResponseRest> update(Cliente client, Long id) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            Optional<Cliente> clientSearch = clientDao.findById(id);
            if (clientSearch.isPresent()) {
                Cliente clientToUpdate = clientSearch.get();
                clientToUpdate.setNombre(client.getNombre());
                clientToUpdate.setNit(client.getNit());
                clientToUpdate.setT_documento(null);
                clientToUpdate.setTelefono(null);
                clientToUpdate.setDireccion(null);
                clientToUpdate.setCorreo(null);
                clientToUpdate.setEstado(client.getEstado());
                clientToUpdate.setValor_credito(client.getValor_credito());
                clientToUpdate.setFecha_credito(client.getFecha_credito());
                clientToUpdate.setCiudaddane(client.getCiudaddane());
                clientToUpdate.setCiudad(client.getCiudad());
                Cliente clientUpdated = clientDao.save(clientToUpdate);
                response.getClienteResponse().setCliente(List.of(clientUpdated));
                response.setMetadata(true, "200", "Cliente actualizado");
            } else {
                response.setMetadata(false, "404", "Cliente no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata(false, "500", "Error al actualizar cliente");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

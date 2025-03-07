package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import com.company.inventory.dao.IClientDao;
import com.company.inventory.model.Client;
import com.company.inventory.response.ClientResponseRest;

@Service
public class ClientServiceImpl implements IClientService {

    @Autowired
    private IClientDao clientDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClientResponseRest> search() {
        ClientResponseRest response = new ClientResponseRest();
        try {
            List<Client> client = (List<Client>) clientDao.findAll();
            response.getClientResponse().setClient(client);
            response.setMetadata("Respuesta ok", "00", "Respuesta exitosa");
        } catch (Exception e) {
            response.setMetadata("Respuesta nok", "-1", "Error al consultar");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ClientResponseRest> save(Client client) {
        ClientResponseRest response = new ClientResponseRest();
        try {
            Client clientSaved = clientDao.save(client);
            response.getClientResponse().setClient(List.of(clientSaved));
            response.setMetadata("Respuesta ok", "00", "Cliente guardado exitosamente");
        } catch (Exception e) {
            response.setMetadata("Respuesta nok", "-1", "Error al guardar el cliente");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClientResponseRest> searchById(Long id) {
        ClientResponseRest response = new ClientResponseRest();
        try {
            Optional<Client> client = clientDao.findById(id);
            if (client.isPresent()) {
                response.getClientResponse().setClient(List.of(client.get()));
                response.setMetadata("Respuesta ok", "00", "Cliente encontrado");
            } else {
                response.setMetadata("Respuesta nok", "-1", "Cliente no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata("Respuesta nok", "-1", "Error al buscar cliente por ID");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClientResponseRest> searchByDocument(String document) {
        ClientResponseRest response = new ClientResponseRest();
        try {
            List<Client> clients = clientDao.findByDocumentLike(document);
            if (!clients.isEmpty()) {
                response.getClientResponse().setClient(clients);
                response.setMetadata("Respuesta ok", "00", "Clientes encontrados");
            } else {
                response.setMetadata("Respuesta nok", "-1", "No se encontraron clientes");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata("Respuesta nok", "-1", "Error al buscar clientes");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ClientResponseRest> deleteById(Long id) {
        ClientResponseRest response = new ClientResponseRest();
        try {
            clientDao.deleteById(id);
            response.setMetadata("Respuesta ok", "00", "Cliente eliminado");
        } catch (Exception e) {
            response.setMetadata("Respuesta nok", "-1", "Error al eliminar el cliente");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ClientResponseRest> update(Client client, Long id) {
        ClientResponseRest response = new ClientResponseRest();
        try {
            Optional<Client> clientSearch = clientDao.findById(id);
            if (clientSearch.isPresent()) {
                Client clientToUpdate = clientSearch.get();
                clientToUpdate.setName(client.getName());
                clientToUpdate.setDocument(client.getDocument());
                clientToUpdate.setT_document(client.getT_document());
                clientToUpdate.setPhone(client.getPhone());
                clientToUpdate.setAddress(client.getAddress());
                clientToUpdate.setEmail(client.getEmail());
                clientToUpdate.setEstado(client.getEstado());
                clientToUpdate.setValor_credito(client.getValor_credito());
                clientToUpdate.setFecha_credito(client.getFecha_credito());
                clientToUpdate.setDepartamento(client.getDepartamento());
                clientToUpdate.setCiudad(client.getCiudad());
                Client clientUpdated = clientDao.save(clientToUpdate);
                response.getClientResponse().setClient(List.of(clientUpdated));
                response.setMetadata("Respuesta ok", "00", "Cliente actualizado");
            } else {
                response.setMetadata("Respuesta nok", "-1", "Cliente no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata("Respuesta nok", "-1", "Error al actualizar cliente");
            e.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

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
    private IClienteDao clienteDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ClienteResponseRest> search() {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            List<Cliente> cliente = (List<Cliente>) clienteDao.findAll();
            response.getClienteResponse().setCliente(cliente);
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
    public ResponseEntity<ClienteResponseRest> save(Cliente cliente) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            Cliente clienteSaved = clienteDao.save(cliente);
            response.getClienteResponse().setCliente(List.of(clienteSaved));
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
            Optional<Cliente> cliente = clienteDao.findById(id);
            if (cliente.isPresent()) {
                response.getClienteResponse().setCliente(List.of(cliente.get()));
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
            List<Cliente> clientes = clienteDao.findByNitLike(nit);
            if (!clientes.isEmpty()) {
                response.getClienteResponse().setCliente(clientes);
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
            clienteDao.deleteById(id);
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
    public ResponseEntity<ClienteResponseRest> update(Cliente cliente, Long id) {
        ClienteResponseRest response = new ClienteResponseRest();
        try {
            Optional<Cliente> clienteSearch = clienteDao.findById(id);
            if (clienteSearch.isPresent()) {
                Cliente clienteToUpdate = clienteSearch.get();
                clienteToUpdate.setNombre(cliente.getNombre());
                clienteToUpdate.setNit(cliente.getNit());
                clienteToUpdate.setT_documento(cliente.getT_documento());
                clienteToUpdate.setTelefono(cliente.getTelefono());
                clienteToUpdate.setDireccion(cliente.getDireccion());
                clienteToUpdate.setCorreo(cliente.getCorreo());
                clienteToUpdate.setEstado(cliente.getEstado());
                clienteToUpdate.setValor_credito(cliente.getValor_credito());
                clienteToUpdate.setFecha_credito(cliente.getFecha_credito());
                clienteToUpdate.setCiudaddane(cliente.getCiudaddane());
                clienteToUpdate.setCiudad(cliente.getCiudad());
                Cliente clienteUpdated = clienteDao.save(clienteToUpdate);
                response.getClienteResponse().setCliente(List.of(clienteUpdated));
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

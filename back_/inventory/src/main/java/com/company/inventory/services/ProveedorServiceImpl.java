package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IProveedorDao;
import com.company.inventory.model.Proveedor;
import com.company.inventory.response.ProveedorResponseRest;
import com.company.inventory.services.interfaces.IProveedorService;

@Service
public class ProveedorServiceImpl implements IProveedorService {
	@Autowired
	private IProveedorDao supplierDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProveedorResponseRest> search() {
		
		ProveedorResponseRest response = new ProveedorResponseRest();
		try {
			List<Proveedor> supplier = (List<Proveedor>)supplierDao.findAll();
			response.getProveedorResponse().setProveedor(supplier);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ProveedorResponseRest> save(Proveedor supplier) {
		ProveedorResponseRest response = new ProveedorResponseRest();
		List<Proveedor> list = new ArrayList<>();
		
		try {
			Proveedor supplierSsved = supplierDao.save(supplier);
			if (supplierSsved != null) {
				list.add(supplierSsved);
				response.getProveedorResponse().setProveedor(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Provvedor no guardado");
				return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el producto");
			return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProveedorResponseRest> searchById(Long id) {
		ProveedorResponseRest response = new ProveedorResponseRest();
		List<Proveedor> list = new ArrayList<>();
		try {
			Optional<Proveedor> supplier = supplierDao.findById(id);
			if(supplier.isPresent()) {
				list.add(supplier.get());
				response.getProveedorResponse().setProveedor(list);
				response.setMetadata(true, "200", "Proveedor encontrado");
			}else {
				response.setMetadata(false, "404", "Proveedor No Encontrada");
				return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<ProveedorResponseRest> deleteById(Long id) {
		ProveedorResponseRest response = new ProveedorResponseRest();
		try {
			supplierDao.deleteById(id);
			response.setMetadata(true, "200", "Registro eliminado");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.OK);
	}
	


	@Override
	@Transactional
	public ResponseEntity<ProveedorResponseRest> update(Proveedor supplier, Long id) {
		ProveedorResponseRest response = new ProveedorResponseRest();
		List<Proveedor> list = new ArrayList<>();
		try {
			Optional<Proveedor> supplierSearch = supplierDao.findById(id);
			if(supplierSearch.isPresent()) {
				//Se procede a actualizar el registro
				supplierSearch.get().setName(supplier.getName());
				supplierSearch.get().setDocument(supplier.getDocument());
				supplierSearch.get().setT_document(supplier.getT_document());
				supplierSearch.get().setPhone(supplier.getPhone());
				supplierSearch.get().setAddress(supplier.getAddress());
				supplierSearch.get().setEmail(supplier.getEmail());
				supplierSearch.get().setEstado(supplier.getEstado());
				supplierSearch.get().setDepartamento(supplier.getDepartamento());
				supplierSearch.get().setCiudad(supplier.getCiudad());
				
				Proveedor supplierToUpdate = supplierDao.save(supplierSearch.get());
				if(supplierToUpdate != null) {
					list.add(supplierToUpdate);
					response.getProveedorResponse().setProveedor(list);
					response.setMetadata(true, "200", "Categoria Actualizada");
				}else {
					response.setMetadata(false, "404", "Categoria No Actualizada");
					return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
				
			}else {
				response.setMetadata(false, "404", "Categoria No Guardada");
				return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar categoria");
			e.getStackTrace();
			return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProveedorResponseRest>(response, HttpStatus.OK);
	}

}


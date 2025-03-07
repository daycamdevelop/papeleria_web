package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.ISupplierDao;
import com.company.inventory.model.Supplier;
import com.company.inventory.response.SupplierResponseRest;

@Service
public class SupplierServiceImpl implements ISupplierService {
	@Autowired
	private ISupplierDao supplierDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<SupplierResponseRest> search() {
		
		SupplierResponseRest response = new SupplierResponseRest();
		try {
			List<Supplier> supplier = (List<Supplier>)supplierDao.findAll();
			response.getSupplierResponse().setSupplier(supplier);
			response.setMetadata("Respuesta ok", "00", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata("Respuesta nok", "-1", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<SupplierResponseRest> save(Supplier supplier) {
		SupplierResponseRest response = new SupplierResponseRest();
		List<Supplier> list = new ArrayList<>();
		
		try {
			Supplier supplierSsved = supplierDao.save(supplier);
			if (supplierSsved != null) {
				list.add(supplierSsved);
				response.getSupplierResponse().setSupplier(list);
				response.setMetadata("Respuesta ok", "00", "Respuesta exitosa");
			}else {
				response.setMetadata("Respuesta nok", "-1", "Provvedor no guardado");
				return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata("Respuesta nok", "-1", "Error al guardar el producto");
			return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<SupplierResponseRest> searchById(Long id) {
		SupplierResponseRest response = new SupplierResponseRest();
		List<Supplier> list = new ArrayList<>();
		try {
			Optional<Supplier> supplier = supplierDao.findById(id);
			if(supplier.isPresent()) {
				list.add(supplier.get());
				response.getSupplierResponse().setSupplier(list);
				response.setMetadata("Respuesta ok", "00", "Proveedor encontrado");
			}else {
				response.setMetadata("Respuesta nok", "-1", "Proveedor No Encontrada");
				return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata("Respuesta nok", "-1", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<SupplierResponseRest> deleteById(Long id) {
		SupplierResponseRest response = new SupplierResponseRest();
		try {
			supplierDao.deleteById(id);
			response.setMetadata("Respuesta ok", "00", "Registro eliminado");
		} catch (Exception e) {
			response.setMetadata("Respuesta nok", "-1", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.OK);
	}
	


	@Override
	@Transactional
	public ResponseEntity<SupplierResponseRest> update(Supplier supplier, Long id) {
		SupplierResponseRest response = new SupplierResponseRest();
		List<Supplier> list = new ArrayList<>();
		try {
			Optional<Supplier> supplierSearch = supplierDao.findById(id);
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
				
				Supplier supplierToUpdate = supplierDao.save(supplierSearch.get());
				if(supplierToUpdate != null) {
					list.add(supplierToUpdate);
					response.getSupplierResponse().setSupplier(list);
					response.setMetadata("Respuesta ok", "00", "Categoria Actualizada");
				}else {
					response.setMetadata("Respuesta nok", "-1", "Categoria No Actualizada");
					return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
				
			}else {
				response.setMetadata("Respuesta nok", "-1", "Categoria No Guardada");
				return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			response.setMetadata("Respuesta nok", "-1", "Error al actualizar categoria");
			e.getStackTrace();
			return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<SupplierResponseRest>(response, HttpStatus.OK);
	}

}


package com.company.inventory.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.inventory.dao.IVendedorDao;
import com.company.inventory.model.Vendedor;
import com.company.inventory.response.VendedorResponseRest;
import com.company.inventory.services.interfaces.IVendedorService;

@Service
public class VendedorServiceImpl implements IVendedorService {
	
	@Autowired
	private IVendedorDao categoryDao;
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<VendedorResponseRest> search() {
		
		VendedorResponseRest response = new VendedorResponseRest();
		try {
			List<Vendedor> category = (List<Vendedor>)categoryDao.findAll();
			response.getVendedorResponse().setVendedor(category);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<VendedorResponseRest> searchById(Long id) {
		VendedorResponseRest response = new VendedorResponseRest();
		List<Vendedor> list = new ArrayList<>();
		try {
			Optional<Vendedor> category = categoryDao.findById(id);
			if(category.isPresent()) {
				list.add(category.get());
				response.getVendedorResponse().setVendedor(list);
				response.setMetadata(true, "200", "Categoria Encontrada");
			}else {
				response.setMetadata(false, "404", "Categoria No Encontrada");
				return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<VendedorResponseRest> save(Vendedor category) {
		VendedorResponseRest response = new VendedorResponseRest();
		List<Vendedor> list = new ArrayList<>();
		try {
			Vendedor categorySave = categoryDao.save(category);
			if(categorySave != null) {
				list.add(categorySave);
				response.getVendedorResponse().setVendedor(list);
				response.setMetadata(true, "200", "Categoria Guardada");
			}else {
				response.setMetadata(false, "404", "Categoria No Guardada");
				return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.BAD_REQUEST);
			}
			
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al guardar categoria");
			e.getStackTrace();
			return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<VendedorResponseRest> update(Vendedor category, Long id) {
		VendedorResponseRest response = new VendedorResponseRest();
		List<Vendedor> list = new ArrayList<>();
		try {
			Optional<Vendedor> categorySearch = categoryDao.findById(id);
			if(categorySearch.isPresent()) {
				//Se procede a actualizar el registro
				categorySearch.get().setName(category.getName());
				categorySearch.get().setDocument(category.getDocument());
				categorySearch.get().setT_document(category.getT_document());
				categorySearch.get().setPhone(category.getPhone());
				categorySearch.get().setAddress(category.getAddress());
				categorySearch.get().setEmail(category.getEmail());
				categorySearch.get().setEstado(category.getEstado());
				categorySearch.get().setDepartamento(category.getDepartamento());
				categorySearch.get().setCiudad(category.getCiudad());
				
				Vendedor categoryToUpdate = categoryDao.save(categorySearch.get());
				if(categoryToUpdate != null) {
					list.add(categoryToUpdate);
					response.getVendedorResponse().setVendedor(list);
					response.setMetadata(true, "200", "Categoria Actualizada");
				}else {
					response.setMetadata(false, "404", "Categoria No Actualizada");
					return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
				
			}else {
				response.setMetadata(false, "404", "Categoria No Guardada");
				return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar categoria");
			e.getStackTrace();
			return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<VendedorResponseRest> deleteById(Long id) {
		VendedorResponseRest response = new VendedorResponseRest();
		try {
			categoryDao.deleteById(id);
			response.setMetadata(true, "200", "Registro eliminado");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<VendedorResponseRest>(response, HttpStatus.OK);
	}
	
	

}

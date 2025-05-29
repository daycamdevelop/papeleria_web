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
	private IProveedorDao proveedorDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProveedorResponseRest> search() {
		
		ProveedorResponseRest response = new ProveedorResponseRest();
		try {
			List<Proveedor> proveedor = (List<Proveedor>)proveedorDao.findAll();
			response.getProveedorResponse().setProveedor(proveedor);
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
	public ResponseEntity<ProveedorResponseRest> save(Proveedor proveedor) {
		ProveedorResponseRest response = new ProveedorResponseRest();
		List<Proveedor> list = new ArrayList<>();
		
		try {
			Proveedor proveedorSaved = proveedorDao.save(proveedor);
			if (proveedorSaved != null) {
				list.add(proveedorSaved);
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
			Optional<Proveedor> proveedor = proveedorDao.findById(id);
			if(proveedor.isPresent()) {
				list.add(proveedor.get());
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
			proveedorDao.deleteById(id);
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
	public ResponseEntity<ProveedorResponseRest> update(Proveedor proveedor, Long id) {
		ProveedorResponseRest response = new ProveedorResponseRest();
		List<Proveedor> list = new ArrayList<>();
		try {
			Optional<Proveedor> proveedorSearch = proveedorDao.findById(id);
			if(proveedorSearch.isPresent()) {
				//Se procede a actualizar el registro
				proveedorSearch.get().setNombre(proveedor.getNombre());
				proveedorSearch.get().setNit(proveedor.getNit());
				proveedorSearch.get().setCelular(proveedor.getCelular());
				proveedorSearch.get().setDireccion(proveedor.getDireccion());
				proveedorSearch.get().setCorreo(proveedor.getCorreo());
				proveedorSearch.get().setEstado(proveedor.getEstado());
				
				Proveedor proveedorToUpdate = proveedorDao.save(proveedorSearch.get());
				if(proveedorToUpdate != null) {
					list.add(proveedorToUpdate);
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


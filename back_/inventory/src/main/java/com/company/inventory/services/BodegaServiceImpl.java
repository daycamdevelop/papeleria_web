package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IBodegaDao;
import com.company.inventory.model.Bodega;
import com.company.inventory.response.BodegaResponseRest;
import com.company.inventory.services.interfaces.IBodegaService;

@Service
public class BodegaServiceImpl implements IBodegaService {
	@Autowired
	private IBodegaDao bodegaDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<BodegaResponseRest> search() {
		BodegaResponseRest response = new BodegaResponseRest();
		try {
			List<Bodega> bodega = (List<Bodega>)bodegaDao.findAll();
			List<Bodega> bodegasActivos = new ArrayList<>();
			for (Bodega prod : bodega ) {
			    if(prod.getEstado().equals("activo")) {
			    	bodegasActivos.add(prod);
			    }
			}
			response.getBodegaResponse().setBodega(bodegasActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<BodegaResponseRest> save(Bodega bodega) {
		BodegaResponseRest response = new BodegaResponseRest();
		List<Bodega> list = new ArrayList<>();
		try {
			Bodega bodegaSaved = bodegaDao.save(bodega);
			if (bodegaSaved != null) {
				list.add(bodegaSaved);
				response.getBodegaResponse().setBodega(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Bodega no guardado");
				return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el Bodega");
			return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<BodegaResponseRest> searchById(Long id) {
		BodegaResponseRest response = new BodegaResponseRest();
		List<Bodega> list = new ArrayList<>();
		try {
			Optional<Bodega> Bodega = bodegaDao.findById(id);
			if(Bodega.isPresent()) {
				list.add(Bodega.get());
				response.getBodegaResponse().setBodega(list);
				response.setMetadata(true, "200", "Bodega encontrado");
			}else {
				response.setMetadata(false, "404", "Bodega No Encontrada");
				return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<BodegaResponseRest> deleteById(Long id) {
		BodegaResponseRest response = new BodegaResponseRest();
		try {
			Optional<Bodega> bodegaSearch = bodegaDao.findById(id);
			if (bodegaSearch.isPresent()) {
			    Bodega Bodega = bodegaSearch.get();
			    Bodega.setEstado("inactivo");
				this.update(Bodega, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "Bodega no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<BodegaResponseRest> update(Bodega bodega, Long id) {
		BodegaResponseRest response = new BodegaResponseRest();
		List<Bodega> list = new ArrayList<>();
		try {
			Optional<Bodega> bodegaSearch = bodegaDao.findById(id);
			if(bodegaSearch.isPresent()) {
				//Se procede a actualizar el registro
				bodegaSearch.get().setNombre(bodega.getNombre());
				bodegaSearch.get().setContacto(bodega.getContacto());
				bodegaSearch.get().setTelefono(bodega.getTelefono());
				bodegaSearch.get().setDireccion(bodega.getDireccion());
				bodegaSearch.get().setEstado(bodega.getEstado());
				bodegaSearch.get().setDesvincular(bodega.getDesvincular());
				Bodega bodegaToUpdate = bodegaDao.save(bodegaSearch.get());
				if(bodegaToUpdate != null) {
					list.add(bodegaToUpdate);
					response.getBodegaResponse().setBodega(list);
					response.setMetadata(true, "200", "Bodega Actualizada");
				}else {
					response.setMetadata(false, "404", "Bodega No Actualizada");
					return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "Bodega No Guardada");
				return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar Bodega");
			e.getStackTrace();
			return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<BodegaResponseRest>(response, HttpStatus.OK);
	}

}


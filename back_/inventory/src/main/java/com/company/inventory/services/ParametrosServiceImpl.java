package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IParametrosDao;
import com.company.inventory.model.Parametros;
import com.company.inventory.response.ParametrosResponseRest;
import com.company.inventory.services.interfaces.IParametrosService;

@Service
public class ParametrosServiceImpl implements IParametrosService {
	@Autowired
	private IParametrosDao parametrosDao;
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ParametrosResponseRest> search() {
		ParametrosResponseRest response = new ParametrosResponseRest();
		try {
			List<Parametros> parametros = (List<Parametros>)parametrosDao.findAll();
			List<Parametros> parametrosActivos = new ArrayList<>();
			for (Parametros prod : parametros ) {
		    	parametrosActivos.add(prod);
			}
			response.getParametrosResponse().setParametros(parametrosActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ParametrosResponseRest> save(Parametros parametros) {
		ParametrosResponseRest response = new ParametrosResponseRest();
		List<Parametros> list = new ArrayList<>();
		try {
			Parametros parametrosSaved = parametrosDao.save(parametros);
			if (parametrosSaved != null) {
				list.add(parametrosSaved);
				response.getParametrosResponse().setParametros(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Parametros no guardado");
				return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el Parametros");
			return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ParametrosResponseRest> searchById(Long id) {
		ParametrosResponseRest response = new ParametrosResponseRest();
		List<Parametros> list = new ArrayList<>();
		try {
			Optional<Parametros> parametros = parametrosDao.findById(id);
			if(parametros.isPresent()) {
				list.add(parametros.get());
				response.getParametrosResponse().setParametros(list);
				response.setMetadata(true, "200", "Parametros encontrado");
			}else {
				response.setMetadata(false, "404", "Parametros No Encontrada");
				return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<ParametrosResponseRest> deleteById(Long id) {
		ParametrosResponseRest response = new ParametrosResponseRest();
		try {
			Optional<Parametros> parametrosSearch = parametrosDao.findById(id);
			if (parametrosSearch.isPresent()) {
			    Parametros parametros = parametrosSearch.get();
			    parametros.setEstado(false);
				this.update(parametros, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "Parametros no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ParametrosResponseRest> update(Parametros parametros, Long id) {
		ParametrosResponseRest response = new ParametrosResponseRest();
		List<Parametros> list = new ArrayList<>();
		try {
			Optional<Parametros> parametrosSearch = parametrosDao.findById(id);
			if(parametrosSearch.isPresent()) {
				//Se procede a actualizar el registro
				parametrosSearch.get().setNombre(parametros.getNombre());
				parametrosSearch.get().setValor(parametros.getValor());
				parametrosSearch.get().setEstado(parametros.isEstado());
				Parametros ParametrosToUpdate = parametrosDao.save(parametrosSearch.get());
				if(ParametrosToUpdate != null) {
					list.add(ParametrosToUpdate);
					response.getParametrosResponse().setParametros(list);
					response.setMetadata(true, "200", "Parametros Actualizada");
				}else {
					response.setMetadata(false, "404", "Parametros No Actualizada");
					return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "Parametros No Guardada");
				return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar Parametros");
			e.getStackTrace();
			return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ParametrosResponseRest>(response, HttpStatus.OK);
	}

}


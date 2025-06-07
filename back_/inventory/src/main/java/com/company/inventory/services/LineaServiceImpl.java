package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.ILineaDao;
import com.company.inventory.model.Linea;
import com.company.inventory.response.LineaResponseRest;
import com.company.inventory.services.interfaces.ILineaService;

@Service
public class LineaServiceImpl implements ILineaService {
	@Autowired
	private ILineaDao LineaDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<LineaResponseRest> search() {
		LineaResponseRest response = new LineaResponseRest();
		try {
			List<Linea> linea = (List<Linea>)LineaDao.findAll();
			List<Linea> lineasActivos = new ArrayList<>();
			for (Linea prod : linea) {
			    if(prod.getEstado().equals("activo")) {
			    	lineasActivos.add(prod);
			    }
			}
			response.getLineaResponse().setLinea(lineasActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<LineaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<LineaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<LineaResponseRest> save(Linea linea) {
		LineaResponseRest response = new LineaResponseRest();
		List<Linea> list = new ArrayList<>();
		try {
			Linea lineaSaved = LineaDao.save(linea);
			if (lineaSaved != null) {
				list.add(lineaSaved);
				response.getLineaResponse().setLinea(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Linea no guardado");
				return new ResponseEntity<LineaResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el Linea");
			return new ResponseEntity<LineaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<LineaResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<LineaResponseRest> searchById(Long id) {
		LineaResponseRest response = new LineaResponseRest();
		List<Linea> list = new ArrayList<>();
		try {
			Optional<Linea> linea = LineaDao.findById(id);
			if(linea.isPresent()) {
				list.add(linea.get());
				response.getLineaResponse().setLinea(list);
				response.setMetadata(true, "200", "Linea encontrado");
			}else {
				response.setMetadata(false, "404", "Linea No Encontrada");
				return new ResponseEntity<LineaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<LineaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<LineaResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<LineaResponseRest> deleteById(Long id) {
		LineaResponseRest response = new LineaResponseRest();
		try {
			Optional<Linea> lineaSearch = LineaDao.findById(id);
			if (lineaSearch.isPresent()) {
			    Linea Linea = lineaSearch.get();
			    Linea.setEstado("inactivo");
				this.update(Linea, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "Linea no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<LineaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<LineaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<LineaResponseRest> update(Linea linea, Long id) {
		LineaResponseRest response = new LineaResponseRest();
		List<Linea> list = new ArrayList<>();
		try {
			Optional<Linea> LineaSearch = LineaDao.findById(id);
			if(LineaSearch.isPresent()) {
				//Se procede a actualizar el registro
				LineaSearch.get().setNombre(linea.getNombre());
				LineaSearch.get().setEstado(linea.getEstado());
				LineaSearch.get().setDesvincular(linea.getDesvincular());
				
				Linea lineaToUpdate = LineaDao.save(LineaSearch.get());
				if(lineaToUpdate != null) {
					list.add(lineaToUpdate);
					response.getLineaResponse().setLinea(list);
					response.setMetadata(true, "200", "Linea Actualizada");
				}else {
					response.setMetadata(false, "404", "Linea No Actualizada");
					return new ResponseEntity<LineaResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "Linea No Guardada");
				return new ResponseEntity<LineaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar Linea");
			e.getStackTrace();
			return new ResponseEntity<LineaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<LineaResponseRest>(response, HttpStatus.OK);
	}

}


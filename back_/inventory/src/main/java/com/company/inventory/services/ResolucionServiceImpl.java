package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IResolucionDao;
import com.company.inventory.model.Resolucion;
import com.company.inventory.response.ResolucionResponseRest;
import com.company.inventory.services.interfaces.IResolucionService;

@Service
public class ResolucionServiceImpl implements IResolucionService {
	@Autowired
	private IResolucionDao resolucionDao;
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ResolucionResponseRest> search() {
		ResolucionResponseRest response = new ResolucionResponseRest();
		try {
			List<Resolucion> resolucion = (List<Resolucion>)resolucionDao.findAll();
			List<Resolucion> resolucionsActivos = new ArrayList<>();
			for (Resolucion prod : resolucion ) {
		    	resolucionsActivos.add(prod);
			}
			response.getResolucionResponse().setResolucion(resolucionsActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ResolucionResponseRest> save(Resolucion resolucion) {
		ResolucionResponseRest response = new ResolucionResponseRest();
		List<Resolucion> list = new ArrayList<>();
		try {
			Resolucion resolucionSaved = resolucionDao.save(resolucion);
			if (resolucionSaved != null) {
				list.add(resolucionSaved);
				response.getResolucionResponse().setResolucion(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Resolucion no guardado");
				return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el Resolucion");
			return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ResolucionResponseRest> searchById(Long id) {
		ResolucionResponseRest response = new ResolucionResponseRest();
		List<Resolucion> list = new ArrayList<>();
		try {
			Optional<Resolucion> Resolucion = resolucionDao.findById(id);
			if(Resolucion.isPresent()) {
				list.add(Resolucion.get());
				response.getResolucionResponse().setResolucion(list);
				response.setMetadata(true, "200", "Resolucion encontrado");
			}else {
				response.setMetadata(false, "404", "Resolucion No Encontrada");
				return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<ResolucionResponseRest> deleteById(Long id) {
		ResolucionResponseRest response = new ResolucionResponseRest();
		try {
			Optional<Resolucion> resolucionSearch = resolucionDao.findById(id);
			if (resolucionSearch.isPresent()) {
			    Resolucion Resolucion = resolucionSearch.get();
				this.update(Resolucion, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "Resolucion no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ResolucionResponseRest> update(Resolucion resolucion, Long id) {
		ResolucionResponseRest response = new ResolucionResponseRest();
		List<Resolucion> list = new ArrayList<>();
		try {
			Optional<Resolucion> resolucionSearch = resolucionDao.findById(id);
			if(resolucionSearch.isPresent()) {
				//Se procede a actualizar el registro
				resolucionSearch.get().setNumresolucion(resolucion.getNumresolucion());
				resolucionSearch.get().setPrefijo(resolucion.getPrefijo());
				resolucionSearch.get().setNumfacinico(resolucion.getNumfacinico());
				resolucionSearch.get().setNumfacfinal(resolucion.getNumfacfinal());
				resolucionSearch.get().setResfecinicio(resolucion.getResfecinicio());
				resolucionSearch.get().setResfecfinal(resolucion.getResfecfinal());
				resolucionSearch.get().setUrl(resolucion.getUrl());
				resolucionSearch.get().setToken(resolucion.getToken());
				resolucionSearch.get().setCorreo(resolucion.getCorreo());
				resolucionSearch.get().setPass(resolucion.getPass());
				resolucionSearch.get().setNit(resolucion.getNit());
				resolucionSearch.get().setCiudad(resolucion.getCiudad());
				resolucionSearch.get().setCantidad(resolucion.getCantidad());
				resolucionSearch.get().setLicfecinicio(resolucion.getLicfecinicio());
				resolucionSearch.get().setLicfecfinal(resolucion.getLicfecfinal());
				resolucionSearch.get().setPrefijopers(resolucion.getPrefijopers());
				Resolucion resolucionToUpdate = resolucionDao.save(resolucionSearch.get());
				if(resolucionToUpdate != null) {
					list.add(resolucionToUpdate);
					response.getResolucionResponse().setResolucion(list);
					response.setMetadata(true, "200", "Resolucion Actualizada");
				}else {
					response.setMetadata(false, "404", "Resolucion No Actualizada");
					return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "Resolucion No Guardada");
				return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar Resolucion");
			e.getStackTrace();
			return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ResolucionResponseRest>(response, HttpStatus.OK);
	}

}


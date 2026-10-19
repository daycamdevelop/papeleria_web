package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IPosElectronicoDao;
import com.company.inventory.model.PosElectronico;
import com.company.inventory.response.PosElectronicoResponseRest;
import com.company.inventory.services.interfaces.IPosElectronicoService;

@Service
public class PosElectronicoServiceImpl implements IPosElectronicoService {
	@Autowired
	private IPosElectronicoDao posElectronicoDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<PosElectronicoResponseRest> search() {
		PosElectronicoResponseRest response = new PosElectronicoResponseRest();
		try {
			List<PosElectronico> posElectronico = (List<PosElectronico>)posElectronicoDao.findAll();
			List<PosElectronico> posElectronicosActivos = new ArrayList<>();
			for (PosElectronico prod : posElectronico) {
			    if(prod.getEstado().equals("activo")) {
			    	posElectronicosActivos.add(prod);
			    }
			}
			response.getPosElectronicoResponse().setPosElectronico(posElectronicosActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<PosElectronicoResponseRest> save(PosElectronico posElectronico) {
		PosElectronicoResponseRest response = new PosElectronicoResponseRest();
		List<PosElectronico> list = new ArrayList<>();
		try {
			PosElectronico posElectronicoSaved = posElectronicoDao.save(posElectronico);
			if (posElectronicoSaved != null) {
				list.add(posElectronicoSaved);
				response.getPosElectronicoResponse().setPosElectronico(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "posElectronico no guardado");
				return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el posElectronico");
			return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<PosElectronicoResponseRest> searchById(Long id) {
		PosElectronicoResponseRest response = new PosElectronicoResponseRest();
		List<PosElectronico> list = new ArrayList<>();
		try {
			Optional<PosElectronico> posElectronico = posElectronicoDao.findById(id);
			if(posElectronico.isPresent()) {
				list.add(posElectronico.get());
				response.getPosElectronicoResponse().setPosElectronico(list);
				response.setMetadata(true, "200", "posElectronico encontrado");
			}else {
				response.setMetadata(false, "404", "posElectronico No Encontrada");
				return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<PosElectronicoResponseRest> deleteById(Long id) {
		PosElectronicoResponseRest response = new PosElectronicoResponseRest();
		try {
			Optional<PosElectronico> posElectronicoSearch = posElectronicoDao.findById(id);
			if (posElectronicoSearch.isPresent()) {
			    PosElectronico posElectronico = posElectronicoSearch.get();
			    posElectronico.setEstado("inactivo");
				this.update(posElectronico, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "posElectronico no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<PosElectronicoResponseRest> update(PosElectronico posElectronico, Long id) {
		PosElectronicoResponseRest response = new PosElectronicoResponseRest();
		List<PosElectronico> list = new ArrayList<>();
		try {
			Optional<PosElectronico> posElectronicoSearch = posElectronicoDao.findById(id);
			if(posElectronicoSearch.isPresent()) {
				//Se procede a actualizar el registro
				posElectronicoSearch.get().setNumfactura(posElectronico.getNumfactura());
				posElectronicoSearch.get().setFechafactura(posElectronico.getFechafactura());
				posElectronicoSearch.get().setCliente(posElectronico.getCliente());
				posElectronicoSearch.get().setProducto(posElectronico.getProducto());
				posElectronicoSearch.get().setCatidadproductos(posElectronico.getCatidadproductos());
				posElectronicoSearch.get().setEstado(posElectronico.getEstado());
				posElectronicoSearch.get().setPrecio(posElectronico.getPrecio());
				posElectronicoSearch.get().setCredito(posElectronico.getCredito());
				posElectronicoSearch.get().setPrecio_unitario(posElectronico.getPrecio_unitario());
				posElectronicoSearch.get().setFecha_anulacion(posElectronico.getFecha_anulacion());				
				posElectronicoSearch.get().setUsuario(posElectronico.getUsuario());
				posElectronicoSearch.get().setVendedor(posElectronico.getVendedor());
				posElectronicoSearch.get().setPorcentaje(posElectronico.getPorcentaje());
				posElectronicoSearch.get().setOrigen(posElectronico.getOrigen());
				posElectronicoSearch.get().setFormapago(posElectronico.getFormapago());
				posElectronicoSearch.get().setDinerorecibido(posElectronico.getDinerorecibido());
				posElectronicoSearch.get().setCambio(posElectronico.getCambio());
				posElectronicoSearch.get().setCostoventa2(posElectronico.getCostoventa2());
				posElectronicoSearch.get().setCostoventa3(posElectronico.getCostoventa3());
				posElectronicoSearch.get().setCodigocredito(posElectronico.getCodigocredito());
				posElectronicoSearch.get().setImprimir(posElectronico.isImprimir());
				posElectronicoSearch.get().setSubtotal(posElectronico.getSubtotal());
				posElectronicoSearch.get().setIvavalor(posElectronico.getIvavalor());
				posElectronicoSearch.get().setFechaimpresion(posElectronico.getFechaimpresion());
				posElectronicoSearch.get().setBodega(posElectronico.getBodega());
				posElectronicoSearch.get().setNotacredito(posElectronico.getNotacredito());
				posElectronicoSearch.get().setFechacredito(posElectronico.getFechacredito());
				posElectronicoSearch.get().setFormapago1(posElectronico.getFormapago1());
				posElectronicoSearch.get().setDinerorecibido1(posElectronico.getDinerorecibido1());
				posElectronicoSearch.get().setRegistro(posElectronico.getRegistro());
				posElectronicoSearch.get().setRegistro2(posElectronico.getRegistro2());
				posElectronicoSearch.get().setCaja(posElectronico.getCaja());
				
				PosElectronico posElectronicoToUpdate = posElectronicoDao.save(posElectronicoSearch.get());
				if(posElectronicoToUpdate != null) {
					list.add(posElectronicoToUpdate);
					response.getPosElectronicoResponse().setPosElectronico(list);
					response.setMetadata(true, "200", "posElectronico Actualizada");
				}else {
					response.setMetadata(false, "404", "posElectronico No Actualizada");
					return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "posElectronico No Guardada");
				return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar posElectronico");
			e.getStackTrace();
			return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<PosElectronicoResponseRest>(response, HttpStatus.OK);
	}
}


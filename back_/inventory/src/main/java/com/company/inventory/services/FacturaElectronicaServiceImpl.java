package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IFacturaElectronicaDao;
import com.company.inventory.model.FacturaElectronica;
import com.company.inventory.response.FacturaElectronicaResponseRest;
import com.company.inventory.services.interfaces.IFacturaElectronicaService;

@Service
public class FacturaElectronicaServiceImpl implements IFacturaElectronicaService {
	@Autowired
	private IFacturaElectronicaDao facturaElectronicaDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<FacturaElectronicaResponseRest> search() {
		FacturaElectronicaResponseRest response = new FacturaElectronicaResponseRest();
		try {
			List<FacturaElectronica> facturaElectronica = (List<FacturaElectronica>)facturaElectronicaDao.findAll();
			List<FacturaElectronica> facturaElectronicasActivos = new ArrayList<>();
			for (FacturaElectronica prod : facturaElectronica) {
			    if(prod.getEstado().equals("activo")) {
			    	facturaElectronicasActivos.add(prod);
			    }
			}
			response.getFacturaElectronicaResponse().setFacturaElectronica(facturaElectronicasActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<FacturaElectronicaResponseRest> save(FacturaElectronica facturaElectronica) {
		FacturaElectronicaResponseRest response = new FacturaElectronicaResponseRest();
		List<FacturaElectronica> list = new ArrayList<>();
		try {
			FacturaElectronica facturaElectronicaSaved = facturaElectronicaDao.save(facturaElectronica);
			if (facturaElectronicaSaved != null) {
				list.add(facturaElectronicaSaved);
				response.getFacturaElectronicaResponse().setFacturaElectronica(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "facturaElectronica no guardado");
				return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el facturaElectronica");
			return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<FacturaElectronicaResponseRest> searchById(Long id) {
		FacturaElectronicaResponseRest response = new FacturaElectronicaResponseRest();
		List<FacturaElectronica> list = new ArrayList<>();
		try {
			Optional<FacturaElectronica> facturaElectronica = facturaElectronicaDao.findById(id);
			if(facturaElectronica.isPresent()) {
				list.add(facturaElectronica.get());
				response.getFacturaElectronicaResponse().setFacturaElectronica(list);
				response.setMetadata(true, "200", "facturaElectronica encontrado");
			}else {
				response.setMetadata(false, "404", "facturaElectronica No Encontrada");
				return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<FacturaElectronicaResponseRest> deleteById(Long id) {
		FacturaElectronicaResponseRest response = new FacturaElectronicaResponseRest();
		try {
			Optional<FacturaElectronica> facturaElectronicaSearch = facturaElectronicaDao.findById(id);
			if (facturaElectronicaSearch.isPresent()) {
			    FacturaElectronica facturaElectronica = facturaElectronicaSearch.get();
			    facturaElectronica.setEstado("inactivo");
				this.update(facturaElectronica, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "facturaElectronica no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<FacturaElectronicaResponseRest> update(FacturaElectronica facturaElectronica, Long id) {
		FacturaElectronicaResponseRest response = new FacturaElectronicaResponseRest();
		List<FacturaElectronica> list = new ArrayList<>();
		try {
			Optional<FacturaElectronica> facturaElectronicaSearch = facturaElectronicaDao.findById(id);
			if(facturaElectronicaSearch.isPresent()) {
				//Se procede a actualizar el registro
				facturaElectronicaSearch.get().setNumfactura(facturaElectronica.getNumfactura());
				facturaElectronicaSearch.get().setFechafactura(facturaElectronica.getFechafactura());
				facturaElectronicaSearch.get().setCliente(facturaElectronica.getCliente());
				facturaElectronicaSearch.get().setProducto(facturaElectronica.getProducto());
				facturaElectronicaSearch.get().setCatidadproductos(facturaElectronica.getCatidadproductos());
				facturaElectronicaSearch.get().setEstado(facturaElectronica.getEstado());
				facturaElectronicaSearch.get().setPrecio(facturaElectronica.getPrecio());
				facturaElectronicaSearch.get().setCredito(facturaElectronica.getCredito());
				facturaElectronicaSearch.get().setPrecio_unitario(facturaElectronica.getPrecio_unitario());
				facturaElectronicaSearch.get().setFecha_anulacion(facturaElectronica.getFecha_anulacion());				
				facturaElectronicaSearch.get().setUsuario(facturaElectronica.getUsuario());
				facturaElectronicaSearch.get().setVendedor(facturaElectronica.getVendedor());
				facturaElectronicaSearch.get().setPorcentaje(facturaElectronica.getPorcentaje());
				facturaElectronicaSearch.get().setOrigen(facturaElectronica.getOrigen());
				facturaElectronicaSearch.get().setFormapago(facturaElectronica.getFormapago());
				facturaElectronicaSearch.get().setDinerorecibido(facturaElectronica.getDinerorecibido());
				facturaElectronicaSearch.get().setCambio(facturaElectronica.getCambio());
				facturaElectronicaSearch.get().setCostoventa2(facturaElectronica.getCostoventa2());
				facturaElectronicaSearch.get().setCostoventa3(facturaElectronica.getCostoventa3());
				facturaElectronicaSearch.get().setCodigocredito(facturaElectronica.getCodigocredito());
				facturaElectronicaSearch.get().setImprimir(facturaElectronica.isImprimir());
				facturaElectronicaSearch.get().setSubtotal(facturaElectronica.getSubtotal());
				facturaElectronicaSearch.get().setIvavalor(facturaElectronica.getIvavalor());
				facturaElectronicaSearch.get().setFechaimpresion(facturaElectronica.getFechaimpresion());
				facturaElectronicaSearch.get().setBodega(facturaElectronica.getBodega());
				facturaElectronicaSearch.get().setNotacredito(facturaElectronica.getNotacredito());
				facturaElectronicaSearch.get().setFechacredito(facturaElectronica.getFechacredito());
				facturaElectronicaSearch.get().setFormapago1(facturaElectronica.getFormapago1());
				facturaElectronicaSearch.get().setDinerorecibido1(facturaElectronica.getDinerorecibido1());
				facturaElectronicaSearch.get().setRegistro(facturaElectronica.getRegistro());
				facturaElectronicaSearch.get().setRegistro2(facturaElectronica.getRegistro2());
				facturaElectronicaSearch.get().setCaja(facturaElectronica.getCaja());
				
				FacturaElectronica facturaElectronicaToUpdate = facturaElectronicaDao.save(facturaElectronicaSearch.get());
				if(facturaElectronicaToUpdate != null) {
					list.add(facturaElectronicaToUpdate);
					response.getFacturaElectronicaResponse().setFacturaElectronica(list);
					response.setMetadata(true, "200", "facturaElectronica Actualizada");
				}else {
					response.setMetadata(false, "404", "facturaElectronica No Actualizada");
					return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "facturaElectronica No Guardada");
				return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar facturaElectronica");
			e.getStackTrace();
			return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaElectronicaResponseRest>(response, HttpStatus.OK);
	}
}


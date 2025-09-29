package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IFacturaDao;
import com.company.inventory.model.Factura;
import com.company.inventory.response.FacturaResponseRest;
import com.company.inventory.services.interfaces.IFacturaService;

@Service
public class FacturaServiceImpl implements IFacturaService {
	@Autowired
	private IFacturaDao facturaDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<FacturaResponseRest> search() {
		FacturaResponseRest response = new FacturaResponseRest();
		try {
			List<Factura> factura = (List<Factura>)facturaDao.findAll();
			List<Factura> facturasActivos = new ArrayList<>();
			for (Factura prod : factura) {
			    if(prod.getEstado().equals("activo")) {
			    		facturasActivos.add(prod);
			    }
			}
			response.getFacturaResponse().setFactura(facturasActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<FacturaResponseRest> save(Factura factura) {
		FacturaResponseRest response = new FacturaResponseRest();
		List<Factura> list = new ArrayList<>();
		try {
			Factura facturaSaved = facturaDao.save(factura);
			if (facturaSaved != null) {
				list.add(facturaSaved);
				response.getFacturaResponse().setFactura(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "factura no guardado");
				return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el factura");
			return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<FacturaResponseRest> searchById(Long id) {
		FacturaResponseRest response = new FacturaResponseRest();
		List<Factura> list = new ArrayList<>();
		try {
			Optional<Factura> factura = facturaDao.findById(id);
			if(factura.isPresent()) {
				list.add(factura.get());
				response.getFacturaResponse().setFactura(list);
				response.setMetadata(true, "200", "factura encontrado");
			}else {
				response.setMetadata(false, "404", "factura No Encontrada");
				return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<FacturaResponseRest> deleteById(Long id) {
		FacturaResponseRest response = new FacturaResponseRest();
		try {
			Optional<Factura> facturaSearch = facturaDao.findById(id);
			if (facturaSearch.isPresent()) {
			    Factura factura = facturaSearch.get();
			    factura.setEstado("inactivo");
				this.update(factura, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "factura no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<FacturaResponseRest> update(Factura factura, Long id) {
		FacturaResponseRest response = new FacturaResponseRest();
		List<Factura> list = new ArrayList<>();
		try {
			Optional<Factura> facturaSearch = facturaDao.findById(id);
			if(facturaSearch.isPresent()) {
				//Se procede a actualizar el registro
				facturaSearch.get().setNumfactura(factura.getNumfactura());
				facturaSearch.get().setFechafactura(factura.getFechafactura());
				facturaSearch.get().setCliente(factura.getCliente());
				facturaSearch.get().setProducto(factura.getProducto());
				facturaSearch.get().setCatidadproductos(factura.getCatidadproductos());
				facturaSearch.get().setEstado(factura.getEstado());
				facturaSearch.get().setPrecio(factura.getPrecio());
				facturaSearch.get().setCredito(factura.getCredito());
				facturaSearch.get().setPrecio_unitario(factura.getPrecio_unitario());
				facturaSearch.get().setFecha_anulacion(factura.getFecha_anulacion());				
				facturaSearch.get().setUsuario(factura.getUsuario());
				facturaSearch.get().setVendedor(factura.getVendedor());
				facturaSearch.get().setPorcentaje(factura.getPorcentaje());
				facturaSearch.get().setOrigen(factura.getOrigen());
				facturaSearch.get().setFormapago(factura.getFormapago());
				facturaSearch.get().setDinerorecibido(factura.getDinerorecibido());
				facturaSearch.get().setCambio(factura.getCambio());
				facturaSearch.get().setCostoventa2(factura.getCostoventa2());
				facturaSearch.get().setCostoventa3(factura.getCostoventa3());
				facturaSearch.get().setCodigocredito(factura.getCodigocredito());
				facturaSearch.get().setImprimir(factura.isImprimir());
				facturaSearch.get().setSubtotal(factura.getSubtotal());
				facturaSearch.get().setIvavalor(factura.getIvavalor());
				facturaSearch.get().setFechaimpresion(factura.getFechaimpresion());
				facturaSearch.get().setBodega(factura.getBodega());
				facturaSearch.get().setNotacredito(factura.getNotacredito());
				facturaSearch.get().setFechacredito(factura.getFechacredito());
				facturaSearch.get().setFormapago1(factura.getFormapago1());
				facturaSearch.get().setDinerorecibido1(factura.getDinerorecibido1());
				facturaSearch.get().setRegistro(factura.getRegistro());
				facturaSearch.get().setRegistro2(factura.getRegistro2());
				facturaSearch.get().setCaja(factura.getCaja());
				
				Factura facturaToUpdate = facturaDao.save(facturaSearch.get());
				if(facturaToUpdate != null) {
					list.add(facturaToUpdate);
					response.getFacturaResponse().setFactura(list);
					response.setMetadata(true, "200", "factura Actualizada");
				}else {
					response.setMetadata(false, "404", "factura No Actualizada");
					return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "factura No Guardada");
				return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar factura");
			e.getStackTrace();
			return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<FacturaResponseRest>(response, HttpStatus.OK);
	}
}


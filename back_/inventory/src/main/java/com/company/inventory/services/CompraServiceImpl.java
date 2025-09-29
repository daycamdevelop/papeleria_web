package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.ICompraDao;
import com.company.inventory.model.Compra;
import com.company.inventory.response.CompraResponseRest;
import com.company.inventory.services.interfaces.ICompraService;

@Service
public class CompraServiceImpl implements ICompraService {
	@Autowired
	private ICompraDao compraDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<CompraResponseRest> search() {
		CompraResponseRest response = new CompraResponseRest();
		try {
			List<Compra> compra = (List<Compra>)compraDao.findAll();
			List<Compra> comprasActivos = new ArrayList<>();
			for (Compra prod : compra) {
			    if(prod.getEstado().equals("activo")) {
			    		comprasActivos.add(prod);
			    }
			}
			response.getCompraResponse().setCompra(comprasActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<CompraResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<CompraResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CompraResponseRest> save(Compra compra) {
		CompraResponseRest response = new CompraResponseRest();
		List<Compra> list = new ArrayList<>();
		try {
			Compra compraSaved = compraDao.save(compra);
			if (compraSaved != null) {
				list.add(compraSaved);
				response.getCompraResponse().setCompra(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Compra no guardado");
				return new ResponseEntity<CompraResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el compra");
			return new ResponseEntity<CompraResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<CompraResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<CompraResponseRest> searchById(Long id) {
		CompraResponseRest response = new CompraResponseRest();
		List<Compra> list = new ArrayList<>();
		try {
			Optional<Compra> compra = compraDao.findById(id);
			if(compra.isPresent()) {
				list.add(compra.get());
				response.getCompraResponse().setCompra(list);
				response.setMetadata(true, "200", "Compra encontrado");
			}else {
				response.setMetadata(false, "404", "Compra No Encontrada");
				return new ResponseEntity<CompraResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<CompraResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<CompraResponseRest>(response, HttpStatus.OK);
	}


	@Override
	@Transactional
	public ResponseEntity<CompraResponseRest> deleteById(Long id) {
		CompraResponseRest response = new CompraResponseRest();
		try {
			Optional<Compra> compraSearch = compraDao.findById(id);
			if (compraSearch.isPresent()) {
			    Compra compra = compraSearch.get();
			    compra.setEstado("inactivo");
				this.update(compra, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "Compra no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<CompraResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<CompraResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CompraResponseRest> update(Compra compra, Long id) {
		CompraResponseRest response = new CompraResponseRest();
		List<Compra> list = new ArrayList<>();
		try {
			Optional<Compra> compraSearch = compraDao.findById(id);
			if(compraSearch.isPresent()) {
				//Se procede a actualizar el registro
				compraSearch.get().setNumfactura(compra.getNumfactura());
				compraSearch.get().setFechafactura(compra.getFechafactura());
				compraSearch.get().setProveedor(compra.getProveedor());
				compraSearch.get().setProducto(compra.getProducto());
				compraSearch.get().setCatidadproductos(compra.getCatidadproductos());
				compraSearch.get().setEstado(compra.getEstado());
				compraSearch.get().setPrecio(compra.getPrecio());
				compraSearch.get().setPrecio_unitario(compra.getPrecio_unitario());
				compraSearch.get().setUsuario(compra.getUsuario());
				compraSearch.get().setNum_preliminar(compra.getNum_preliminar());
				compraSearch.get().setPrecio_venta(compra.getPrecio_venta());
				compraSearch.get().setCredito(compra.getCredito());
				compraSearch.get().setNumfacturap(compra.getNumfacturap());
				compraSearch.get().setFormapago(compra.getFormapago());
				compraSearch.get().setOrigen(compra.getOrigen());
				compraSearch.get().setPrecio_venta2(compra.getPrecio_venta2());
				compraSearch.get().setPrecio_venta3(compra.getPrecio_venta3());
				compraSearch.get().setDinerorecibido(compra.getDinerorecibido());
				compraSearch.get().setCambio(compra.getCambio());
				compraSearch.get().setSubtotal(compra.getSubtotal());
				compraSearch.get().setIvavalor(compra.getIvavalor());
				compraSearch.get().setPorcentaje(compra.getPorcentaje());
				compraSearch.get().setBodega(compra.getBodega());
				compraSearch.get().setRegistro(compra.getRegistro());
				compraSearch.get().setRegistro2(compra.getRegistro2());
				
				Compra compraToUpdate = compraDao.save(compraSearch.get());
				if(compraToUpdate != null) {
					list.add(compraToUpdate);
					response.getCompraResponse().setCompra(list);
					response.setMetadata(true, "200", "Compra Actualizada");
				}else {
					response.setMetadata(false, "404", "Compra No Actualizada");
					return new ResponseEntity<CompraResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "Compra No Guardada");
				return new ResponseEntity<CompraResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar compra");
			e.getStackTrace();
			return new ResponseEntity<CompraResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<CompraResponseRest>(response, HttpStatus.OK);
	}

}


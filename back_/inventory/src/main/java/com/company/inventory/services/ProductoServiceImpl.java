package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.company.inventory.dao.IProductoDao;
import com.company.inventory.model.Producto;
import com.company.inventory.response.ProductoResponseRest;
import com.company.inventory.services.interfaces.IProductoService;

@Service
public class ProductoServiceImpl implements IProductoService {
	@Autowired
	private IProductoDao productoDao;
	
	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProductoResponseRest> search() {
		ProductoResponseRest response = new ProductoResponseRest();
		try {
			List<Producto> producto = (List<Producto>)productoDao.findAll();
			List<Producto> productosActivos = new ArrayList<>();
			for (Producto prod : producto) {
			    if(prod.getEstado().equals("activo")) {
			    	prod.setCodigo(prod.getCodigo().toLowerCase());
			    	prod.setNombre(prod.getNombre().toLowerCase());
			    	productosActivos.add(prod);
			    }
			}
			response.getProductoResponse().setProducto(productosActivos);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ProductoResponseRest> save(Producto producto) {
		ProductoResponseRest response = new ProductoResponseRest();
		List<Producto> list = new ArrayList<>();
		try {
			Producto productoSaved = productoDao.save(producto);
			if (productoSaved != null) {
				list.add(productoSaved);
				response.getProductoResponse().setProducto(list);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "Producto no guardado");
				return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el producto");
			return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK); 
	}

	
	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProductoResponseRest> searchById(Long id) {
		ProductoResponseRest response = new ProductoResponseRest();
		List<Producto> list = new ArrayList<>();
		try {
			Optional<Producto> producto = productoDao.findById(id);
			if(producto.isPresent()) {
				list.add(producto.get());
				response.getProductoResponse().setProducto(list);
				response.setMetadata(true, "200", "Producto encontrado");
			}else {
				response.setMetadata(false, "404", "Producto No Encontrada");
				return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar por id");
			e.getStackTrace();
			return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ProductoResponseRest> deleteById(Long id) {
		ProductoResponseRest response = new ProductoResponseRest();
		try {
			Optional<Producto> productoSearch = productoDao.findById(id);
			if (productoSearch.isPresent()) {
			    Producto producto = productoSearch.get();
			    producto.setEstado("inactivo");
				this.update(producto, id);
				response.setMetadata(true, "200", "Registro eliminado");
			} else {
				response.setMetadata(false, "404", "Producto no encontrado");
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<ProductoResponseRest> update(Producto producto, Long id) {
		ProductoResponseRest response = new ProductoResponseRest();
		List<Producto> list = new ArrayList<>();
		try {
			Optional<Producto> productoSearch = productoDao.findById(id);
			if(productoSearch.isPresent()) {
				//Se procede a actualizar el registro
				productoSearch.get().setCodigo(producto.getCodigo());
				productoSearch.get().setNombre(producto.getNombre());
				productoSearch.get().setCantidad(producto.getCantidad());
				productoSearch.get().setFecharegistro(producto.getFecharegistro());
				productoSearch.get().setLinea(producto.getLinea());
				productoSearch.get().setBodega(producto.getBodega());
				productoSearch.get().setEstado(producto.getEstado());
				productoSearch.get().setDesvincular(producto.getDesvincular());
				productoSearch.get().setCosto(producto.getCosto());
				productoSearch.get().setCostoventa(producto.getCostoventa());
				productoSearch.get().setCostoventa2(producto.getCostoventa2());
				productoSearch.get().setCostoventa3(producto.getCostoventa3());
				productoSearch.get().setIva(producto.getIva());
				productoSearch.get().setObservacion(producto.getObservacion());
				productoSearch.get().setRegistro(producto.getRegistro());
				productoSearch.get().setRegistro2(producto.getRegistro2());
				
				Producto productoToUpdate = productoDao.save(productoSearch.get());
				if(productoToUpdate != null) {
					list.add(productoToUpdate);
					response.getProductoResponse().setProducto(list);
					response.setMetadata(true, "200", "Producto Actualizada");
				}else {
					response.setMetadata(false, "404", "Producto No Actualizada");
					return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.setMetadata(false, "404", "Producto No Guardada");
				return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al actualizar producto");
			e.getStackTrace();
			return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK);
	}

}


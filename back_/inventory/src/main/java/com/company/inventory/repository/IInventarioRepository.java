package com.company.inventory.repository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.company.inventory.model.Inventario;
import com.company.inventory.response.InventarioResponseRest;

@Repository
public class IInventarioRepository {

    private final JdbcTemplate jdbcTemplate;

    public IInventarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<InventarioResponseRest> inventario(int bodega, int linea) {
    	InventarioResponseRest response = new InventarioResponseRest();
		String sql = """
        SELECT * FROM inventario(?, ?);
	    """;
		try {
			List<Inventario> inventario = (List<Inventario>)jdbcTemplate.query(
			        sql,
			        new Object[]{bodega, linea},
			        (rs, rowNum) -> new Inventario(
			            rs.getString("bodega"),
			            rs.getString("codigo"),
			            rs.getString("producto"),
			            rs.getString("linea"),
			            rs.getInt("cantidad"),
			            rs.getInt("costo"),
			            rs.getInt("precio"),
			            rs.getInt("costoventa"),
			            rs.getLong("costoventatotal"),
			            rs.getInt("costoventa2"),
			            rs.getInt("costoventa3"),
			            rs.getInt("iva"),
			            rs.getString("tipoiva"),
			            rs.getString("serial")
			        )
			    );
			response.getInventarioResponse().setInventario(inventario);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			System.out.println(e);
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<InventarioResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<InventarioResponseRest>(response, HttpStatus.OK);
	}
}


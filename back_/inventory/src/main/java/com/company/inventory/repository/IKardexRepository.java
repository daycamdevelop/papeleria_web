package com.company.inventory.repository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.company.inventory.model.Kardex;
import com.company.inventory.response.KardexResponseRest;

@Repository
public class IKardexRepository {

    private final JdbcTemplate jdbcTemplate;

    public IKardexRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<KardexResponseRest> kardex(String codigoSel, String fechaInicio) {
    	KardexResponseRest response = new KardexResponseRest();
		String sql = """
        SELECT * FROM kardex(?, ?);
	    """;
		try {
			List<Kardex> kardex = (List<Kardex>)jdbcTemplate.query(
			        sql,
			        new Object[]{codigoSel, fechaInicio},
			        (rs, rowNum) -> new Kardex(
			            rs.getString("fecha"),
			            rs.getString("tipo"),
			            rs.getInt("numerofactura"),
			            rs.getInt("cantidad"),
			            rs.getInt("entradas"),
			            rs.getInt("salidas"),
			            rs.getInt("saldo"),
			            rs.getString("usuarioSel")
			        )
			    );
			response.getKardexResponse().setKardex(kardex);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			System.err.print(e);
			return new ResponseEntity<KardexResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<KardexResponseRest>(response, HttpStatus.OK);
	}
}


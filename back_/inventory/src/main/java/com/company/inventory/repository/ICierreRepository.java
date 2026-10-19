package com.company.inventory.repository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.company.inventory.model.Cierre;
import com.company.inventory.response.CierreResponseRest;

@Repository
public class ICierreRepository {

    private final JdbcTemplate jdbcTemplate;

    public ICierreRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<CierreResponseRest> cierre(String fechaInicio, String fechaFin) {
		CierreResponseRest response = new CierreResponseRest();
		String sql = """
        SELECT * FROM cierre(?, ?, ?);
	    """;
		try {
			Cierre cierre = (Cierre)jdbcTemplate.queryForObject(
			        sql,
			        new Object[]{fechaInicio, fechaFin, 1},
			        (rs, rowNum) -> new Cierre(
			            rs.getString("fechadesdevar"),
			            rs.getString("fechahastavar"),
			            rs.getInt("credito"),
			            rs.getInt("efectivo"),
			            rs.getInt("transferencia"),
			            rs.getInt("tarjeta"),
			            rs.getInt("nequi"),
			            rs.getInt("daviplata"),
			            rs.getInt("abonosefectivo"),
			            rs.getInt("abonostransferencia"),
			            rs.getInt("abonostarjeta"),
			            rs.getInt("mini"),
			            rs.getInt("maxi"),
			            rs.getInt("cont"),
			            rs.getInt("base"),
			            rs.getInt("entrada"),
			            rs.getInt("salida"),
			            rs.getInt("devolucion"),
			            rs.getInt("facturas_anuladas"),
			            rs.getInt("pasamanos"),
			            rs.getInt("notacredito"),
			            rs.getString("emp"),
			            rs.getString("emp1"),
			            rs.getString("emp2"),
			            rs.getString("nomemp"),
			            rs.getString("nite"),
			            rs.getString("direccion"),
			            rs.getString("tel1"),
			            rs.getString("tel2"),
			            rs.getString("usuario"),
			            rs.getInt("saldo_caja")
			        )
			    );
			response.getCierreResponse().setCierre(cierre);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<CierreResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<CierreResponseRest>(response, HttpStatus.OK);
	}
}


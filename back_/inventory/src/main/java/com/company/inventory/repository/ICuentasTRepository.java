package com.company.inventory.repository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.company.inventory.model.CuentasT;
import com.company.inventory.response.CuentasTResponseRest;

@Repository
public class ICuentasTRepository {

    private final JdbcTemplate jdbcTemplate;

    public ICuentasTRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<CuentasTResponseRest> ingresos_egresos(int usuario) {
    	CuentasTResponseRest response = new CuentasTResponseRest();
		String sql = """
        SELECT * FROM ingresos_egresos(?);
	    """;
		try {
			CuentasT cuentas_t = (CuentasT)jdbcTemplate.queryForObject(
			        sql,
			        new Object[]{usuario},
			        (rs, rowNum) -> new CuentasT(
			            rs.getString("concepto"),
			            rs.getString("e_s"),
			            rs.getString("valor"),
			            rs.getString("fecha"),
			            rs.getInt(usuario)
			        )
			    );
			response.getCuentasTResponse().setCuentasT(cuentas_t);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<CuentasTResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<CuentasTResponseRest>(response, HttpStatus.OK);
	}
}


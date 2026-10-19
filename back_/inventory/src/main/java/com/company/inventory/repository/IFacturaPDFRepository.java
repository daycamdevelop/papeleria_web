package com.company.inventory.repository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.company.inventory.model.FacturaElectronica;
import com.company.inventory.model.FacturaElectronicaPDF;
import com.company.inventory.model.FacturaPDF;
import com.company.inventory.model.PosElectronicoPDF;
import com.company.inventory.response.GetPDFResponseRest;

@Repository
public class IFacturaPDFRepository {

    private final JdbcTemplate jdbcTemplate;

    public IFacturaPDFRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<GetPDFResponseRest> facturaPDF(int numerofactura) {
    	GetPDFResponseRest response = new GetPDFResponseRest();
		String sql = """
        SELECT * FROM factura(?);
	    """;
		try {
			List<FacturaPDF> facturaPDF = (List<FacturaPDF>)jdbcTemplate.query(
			        sql,
			        new Object[]{numerofactura},
			        (rs, rowNum) -> new FacturaPDF(
		        		rs.getInt("id"),
		        		rs.getInt("numfactura"),
		        		rs.getString("origen"),
		        		rs.getString("codigo"),
		        		rs.getString("fechafactura"),
		        		rs.getString("cliente"),
		        		rs.getString("nit"),
		        		rs.getString("direccioncli"),
		        		rs.getString("telefonocli"),
		        		rs.getString("nombre"),
		        		rs.getInt("catidadproductos"),
		        		rs.getInt("precio_unitario"),
		        		rs.getInt("credito"),
		        		rs.getInt("precio"),
		        		rs.getString("pago"),
		        		rs.getInt("dinerorecibido"),
		        		rs.getInt("cambio"),
		        		rs.getInt("porcentaje"),
		        		rs.getString("vendedor"),
		        		rs.getInt("val"),
		        		rs.getInt("val2"),
		        		rs.getString("titulo"),
		        		rs.getString("emp"),
		        		rs.getString("nomemp"),
		        		rs.getString("nite"),
		        		rs.getString("direccion"),
		        		rs.getString("tel1"),
		        		rs.getString("tel2"),
		        		rs.getString("emp1"),
		        		rs.getString("emp2"),
		        		rs.getString("rp1"),
		        		rs.getString("rp2"),
		        		rs.getString("rp3"),
		        		rs.getString("rp4"),
		        		rs.getString("titulorespos"),
		        		rs.getInt("iva"),
		        		rs.getString("domicilio"),
		        		rs.getString("fechacredito"),
		        		rs.getString("pago1"),
		        		rs.getInt("dinerorecibido1"),
		        		rs.getInt("p"),
		        		rs.getInt("p1"),
		        		rs.getInt("items"),
		        		rs.getInt("articulos")
			        )
			    );
			response.getFacturaPDFResponse().setFacturaPDF(facturaPDF);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			System.out.println(e);
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<GetPDFResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<GetPDFResponseRest>(response, HttpStatus.OK);
	}
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<GetPDFResponseRest> factura_electronicaPDF(int numerofactura) {
    	GetPDFResponseRest response = new GetPDFResponseRest();
		String sql = """
        SELECT * FROM factura_electronica(?);
	    """;
		try {
			List<FacturaElectronicaPDF> factura_electronicaPDF = (List<FacturaElectronicaPDF>)jdbcTemplate.query(
			        sql,
			        new Object[]{numerofactura},
			        (rs, rowNum) -> new FacturaElectronicaPDF(
		        		rs.getInt("id"),
		        		rs.getInt("numfactura"),
		        		rs.getString("origen"),
		        		rs.getString("codigo"),
		        		rs.getString("fechafactura"),
		        		rs.getString("cliente"),
		        		rs.getString("nit"),
		        		rs.getString("direccioncli"),
		        		rs.getString("telefonocli"),
		        		rs.getString("nombre"),
		        		rs.getInt("catidadproductos"),
		        		rs.getInt("precio_unitario"),
		        		rs.getInt("credito"),
		        		rs.getInt("precio"),
		        		rs.getString("pago"),
		        		rs.getInt("dinerorecibido"),
		        		rs.getInt("cambio"),
		        		rs.getInt("porcentaje"),
		        		rs.getString("vendedor"),
		        		rs.getInt("val"),
		        		rs.getInt("val2"),
		        		rs.getString("titulo"),
		        		rs.getString("emp"),
		        		rs.getString("nomemp"),
		        		rs.getString("nite"),
		        		rs.getString("direccion"),
		        		rs.getString("tel1"),
		        		rs.getString("tel2"),
		        		rs.getString("emp1"),
		        		rs.getString("emp2"),
		        		rs.getString("rp1"),
		        		rs.getString("rp2"),
		        		rs.getString("rp3"),
		        		rs.getString("rp4"),
		        		rs.getString("titulorespos"),
		        		rs.getInt("iva"),
		        		rs.getString("domicilio"),
		        		rs.getString("fechacredito"),
		        		rs.getString("pago1"),
		        		rs.getInt("dinerorecibido1"),
		        		rs.getInt("p"),
		        		rs.getInt("p1"),
		        		rs.getInt("items"),
		        		rs.getInt("articulos")
			        )
			    );
			response.getFactura_electronicaPDFResponse().setFactura_electronicaPDF(factura_electronicaPDF);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			System.out.println(e);
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<GetPDFResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<GetPDFResponseRest>(response, HttpStatus.OK);
	}
    
    @SuppressWarnings("deprecation")
    public ResponseEntity<GetPDFResponseRest> pos_electronicoPDF(int numerofactura) {
    	GetPDFResponseRest response = new GetPDFResponseRest();
		String sql = """
        SELECT * FROM pos_electronico(?);
	    """;
		try {
			List<PosElectronicoPDF> pos_electronicoPDF = (List<PosElectronicoPDF>)jdbcTemplate.query(
			        sql,
			        new Object[]{numerofactura},
			        (rs, rowNum) -> new PosElectronicoPDF(
		        		rs.getInt("id"),
		        		rs.getInt("numfactura"),
		        		rs.getString("origen"),
		        		rs.getString("codigo"),
		        		rs.getString("fechafactura"),
		        		rs.getString("cliente"),
		        		rs.getString("nit"),
		        		rs.getString("direccioncli"),
		        		rs.getString("telefonocli"),
		        		rs.getString("nombre"),
		        		rs.getInt("catidadproductos"),
		        		rs.getInt("precio_unitario"),
		        		rs.getInt("credito"),
		        		rs.getInt("precio"),
		        		rs.getString("pago"),
		        		rs.getInt("dinerorecibido"),
		        		rs.getInt("cambio"),
		        		rs.getInt("porcentaje"),
		        		rs.getString("vendedor"),
		        		rs.getInt("val"),
		        		rs.getInt("val2"),
		        		rs.getString("titulo"),
		        		rs.getString("emp"),
		        		rs.getString("nomemp"),
		        		rs.getString("nite"),
		        		rs.getString("direccion"),
		        		rs.getString("tel1"),
		        		rs.getString("tel2"),
		        		rs.getString("emp1"),
		        		rs.getString("emp2"),
		        		rs.getString("rp1"),
		        		rs.getString("rp2"),
		        		rs.getString("rp3"),
		        		rs.getString("rp4"),
		        		rs.getString("titulorespos"),
		        		rs.getInt("iva"),
		        		rs.getString("domicilio"),
		        		rs.getString("fechacredito"),
		        		rs.getString("pago1"),
		        		rs.getInt("dinerorecibido1"),
		        		rs.getInt("p"),
		        		rs.getInt("p1"),
		        		rs.getInt("items"),
		        		rs.getInt("articulos")
			        )
			    );
			response.getPos_electronicoPDFResponse().setPos_electronicoPDF(pos_electronicoPDF);
			response.setMetadata(true, "200", "Respuesta exitosa");
		} catch (Exception e) {
			System.out.println(e);
			response.setMetadata(false, "500", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<GetPDFResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<GetPDFResponseRest>(response, HttpStatus.OK);
	}
}


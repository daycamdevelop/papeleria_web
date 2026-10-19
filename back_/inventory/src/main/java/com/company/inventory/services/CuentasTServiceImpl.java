package com.company.inventory.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import com.company.inventory.dao.ICuentasTDao;
import com.company.inventory.model.CuentasT;
import com.company.inventory.response.CuentasTResponseRest;
import com.company.inventory.services.interfaces.ICuentasTService;

@Service
public class CuentasTServiceImpl implements ICuentasTService {
	@Autowired
	private ICuentasTDao cuentasTDao;
	
	@Override
	@Transactional
	public ResponseEntity<CuentasTResponseRest> save(CuentasT cuentasT) {
		CuentasTResponseRest response = new CuentasTResponseRest();
		List<CuentasT> list = new ArrayList<>();
		try {
			CuentasT cuentasTSaved = cuentasTDao.save(cuentasT);
			if (cuentasTSaved != null) {
				list.add(cuentasTSaved);
				response.getCuentasTResponse().setCuentasT(cuentasT);
				response.setMetadata(true, "200", "Respuesta exitosa");
			}else {
				response.setMetadata(false, "404", "factura no guardado");
				return new ResponseEntity<CuentasTResponseRest>(response, HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			e.getStackTrace();
			response.setMetadata(false, "500", "Error al guardar el factura");
			return new ResponseEntity<CuentasTResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		return new ResponseEntity<CuentasTResponseRest>(response, HttpStatus.OK); 
	}
}


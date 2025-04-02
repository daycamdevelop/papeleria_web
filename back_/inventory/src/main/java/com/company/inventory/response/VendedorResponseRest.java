package com.company.inventory.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendedorResponseRest extends _ResponseRest {
	private VendedorResponse vendedorResponse = new VendedorResponse();
}

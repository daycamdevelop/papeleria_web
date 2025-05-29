package com.company.inventory.response;

import java.util.*;
import com.company.inventory.model.Vendedor;
import lombok.Data;

@Data
public class VendedorResponse {

	private List<Vendedor> vendedor;
}

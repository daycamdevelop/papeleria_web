package com.company.inventory.response;

import java.util.List;

import com.company.inventory.model.Inventario;
import com.company.inventory.model.Kardex;

import lombok.Data;

@Data
public class KardexResponse {
	
	List<Kardex> kardex;
}


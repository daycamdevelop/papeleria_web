package com.company.inventory.response;

import java.util.List;

import com.company.inventory.model.Inventario;

import lombok.Data;

@Data
public class InventarioResponse {
	
	List<Inventario> inventario;
}


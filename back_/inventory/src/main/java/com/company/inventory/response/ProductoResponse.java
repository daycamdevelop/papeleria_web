package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Producto;

import lombok.Data;

@Data
public class ProductoResponse {
	
	List<Producto> producto;
}


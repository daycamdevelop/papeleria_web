package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Supplier;

import lombok.Data;

@Data
public class SupplierResponse {
	
	List<Supplier> supplier;
}


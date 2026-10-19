package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Parametros;

import lombok.Data;

@Data
public class ParametrosResponse {
	
	List<Parametros> parametros;
}
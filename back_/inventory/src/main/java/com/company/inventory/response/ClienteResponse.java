package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Cliente;

import lombok.Data;

@Data
public class ClienteResponse {
	
	List<Cliente> cliente;
}

package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Client;

import lombok.Data;

@Data
public class ClientResponse {
	
	List<Client> client;
}

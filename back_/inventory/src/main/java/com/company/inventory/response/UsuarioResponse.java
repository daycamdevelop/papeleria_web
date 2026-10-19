package com.company.inventory.response;

import java.util.*;

import com.company.inventory.model.Usuario;

import lombok.Data;

@Data
public class UsuarioResponse {
	
	List<Usuario> usuario;
}

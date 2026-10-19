package com.company.inventory.response;

import java.util.List;

import com.company.inventory.model.PosElectronicoPDF;

import lombok.Data;

@Data
public class PosElectronicoPDFResponse {
	
	List<PosElectronicoPDF> pos_electronicoPDF;
}


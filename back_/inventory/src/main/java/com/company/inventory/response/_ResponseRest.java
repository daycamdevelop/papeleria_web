package com.company.inventory.response;
import java.util.*;

public class _ResponseRest {
	private ArrayList<HashMap<String, String>> metadata = new  ArrayList<>();

	public ArrayList<HashMap<String, String>> getMetadata() {
		return metadata;
	}

	public void setMetadata(boolean type, String code, String description) {
		HashMap<String, String> map = new HashMap<String, String>();
		Date date = new Date();
		if(type) {
			map.put("type", "Respuesta OK");
		} else {
			map.put("type", "Respuesta Error");
		}
		map.put("code", code);
		map.put("date", date.toString());
		map.put("description", description);
		metadata.add(map);
	}
}


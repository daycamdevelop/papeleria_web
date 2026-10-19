import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  getInventario(bodega:number, linea:number) {
    const endpoint = `${base_url}/inventario?bodega=`+bodega+`&linea=`+linea;
    return this.http.get(endpoint);
  }

  exportInventario() {
    const endpoint = `${base_url}/Inventario/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

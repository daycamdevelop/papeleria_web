import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FacturaElectronicaService {

  constructor(private http: HttpClient) { }

  getFacturaElectronica() {
    const endpoint = `${base_url}/factura_electronica`;
    return this.http.get(endpoint);
  }

  saveFacturaElectronica(body: any) {
    const endpoint = `${base_url}/factura_electronica`;
    return this.http.post(endpoint, body);
  }

  updateFacturaElectronica(body: any, id: any) {
    const endpoint = `${base_url}/factura_electronica/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteFacturaElectronica(id: any) {
    const endpoint = `${base_url}/factura_electronica/${id}`;
    return this.http.delete(endpoint);
  }

  getFacturaElectronicaById(id: any) {
    const endpoint = `${base_url}/factura_electronica/${id}`;
    return this.http.get(endpoint);
  }

  getFacturaElectronicaPDF(numerofactura: any) {
    const endpoint = `${base_url}/factura_electronicaPDF?numerofactura=`+numerofactura;
    return this.http.get(endpoint);
  }

  exportProduct() {
    const endpoint = `${base_url}/factura_electronica/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

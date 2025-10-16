import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  getFactura() {
    const endpoint = `${base_url}/factura`;
    return this.http.get(endpoint);
  }

  saveFactura(body: any) {
    const endpoint = `${base_url}/factura`;
    return this.http.post(endpoint, body);
  }

  updateFactura(body: any, id: any) {
    const endpoint = `${base_url}/factura/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteFactura(id: any) {
    const endpoint = `${base_url}/factura/${id}`;
    return this.http.delete(endpoint);
  }

  getFacturaById(id: any) {
    const endpoint = `${base_url}/factura/${id}`;
    return this.http.get(endpoint);
  }

  exportProduct() {
    const endpoint = `${base_url}/factura/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

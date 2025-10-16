import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  getCompra() {
    const endpoint = `${base_url}/compra`;
    return this.http.get(endpoint);
  }

  saveCompra(body: any) {
    const endpoint = `${base_url}/compra`;
    return this.http.post(endpoint, body);
  }

  updateCompra(body: any, id: any) {
    const endpoint = `${base_url}/compra/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteCompra(id: any) {
    const endpoint = `${base_url}/compra/${id}`;
    return this.http.delete(endpoint);
  }

  getCompraById(id: any) {
    const endpoint = `${base_url}/compra/${id}`;
    return this.http.get(endpoint);
  }

  exportProduct() {
    const endpoint = `${base_url}/compra/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

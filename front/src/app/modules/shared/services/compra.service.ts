import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  getProduct() {
    const endpoint = `${base_url}/compra`;
    return this.http.get(endpoint);
  }

  saveProduct(body: any) {
    const endpoint = `${base_url}/compra`;
    return this.http.post(endpoint, body);
  }

  updateProduct(body: any, id: any) {
    const endpoint = `${base_url}/compra/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteProduct(id: any) {
    const endpoint = `${base_url}/compra/${id}`;
    return this.http.delete(endpoint);
  }

  getProductById(id: any) {
    const endpoint = `${base_url}/compra/${id}`;
    return this.http.get(endpoint);
  }

  getProductByDocument(document: string) {
    const endpoint = `${base_url}/compra/document/${document}`;
    return this.http.get(endpoint);
  }

  exportProduct() {
    const endpoint = `${base_url}/compra/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

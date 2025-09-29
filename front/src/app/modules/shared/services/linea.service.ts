import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LineaService {

  constructor(private http: HttpClient) { }

  getLinea() {
    const endpoint = `${base_url}/linea`;
    return this.http.get(endpoint);
  }

  saveLinea(body: any) {
    const endpoint = `${base_url}/linea`;
    return this.http.post(endpoint, body);
  }

  updateLinea(body: any, id: any) {
    const endpoint = `${base_url}/linea/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteLinea(id: any) {
    const endpoint = `${base_url}/linea/${id}`;
    return this.http.delete(endpoint);
  }

  getLineaById(id: any) {
    const endpoint = `${base_url}/linea/${id}`;
    return this.http.get(endpoint);
  }

  getLineaByDocument(document: string) {
    const endpoint = `${base_url}/linea/document/${document}`;
    return this.http.get(endpoint);
  }

  exportLinea() {
    const endpoint = `${base_url}/linea/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

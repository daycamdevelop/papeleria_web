import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  constructor(private http: HttpClient) { }

  getResolucion() {
    const endpoint = `${base_url}/resolucion`;
    return this.http.get(endpoint);
  }

  saveResolucion(body: any) {
    const endpoint = `${base_url}/resolucion`;
    return this.http.post(endpoint, body);
  }

  updateResolucion(body: any, id: any) {
    const endpoint = `${base_url}/resolucion/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteResolucion(id: any) {
    const endpoint = `${base_url}/resolucion/${id}`;
    return this.http.delete(endpoint);
  }

  getResolucionById(id: any) {
    const endpoint = `${base_url}/resolucion/${id}`;
    return this.http.get(endpoint);
  }

  getResolucionByDocument(document: string) {
    const endpoint = `${base_url}/resolucion/document/${document}`;
    return this.http.get(endpoint);
  }

  exportResolucion() {
    const endpoint = `${base_url}/resolucion/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

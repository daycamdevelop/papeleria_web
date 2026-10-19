import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private http: HttpClient) { }

  getParametros() {
    const endpoint = `${base_url}/parametros`;
    return this.http.get(endpoint);
  }

  saveParametros(body: any) {
    const endpoint = `${base_url}/parametros`;
    return this.http.post(endpoint, body);
  }

  updateParametros(body: any, id: any) {
    const endpoint = `${base_url}/parametros/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteParametros(id: any) {
    const endpoint = `${base_url}/parametros/${id}`;
    return this.http.delete(endpoint);
  }

  getParametrosById(id: any) {
    const endpoint = `${base_url}/parametros/${id}`;
    return this.http.get(endpoint);
  }

  getParametrosByDocument(document: string) {
    const endpoint = `${base_url}/parametros/document/${document}`;
    return this.http.get(endpoint);
  }

  exportParametros() {
    const endpoint = `${base_url}/parametros/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

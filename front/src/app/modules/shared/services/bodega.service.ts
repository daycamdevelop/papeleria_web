import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  constructor(private http: HttpClient) { }

  getBodega() {
    const endpoint = `${base_url}/bodega`;
    return this.http.get(endpoint);
  }

  saveBodega(body: any) {
    const endpoint = `${base_url}/bodega`;
    return this.http.post(endpoint, body);
  }

  updateBodega(body: any, id: any) {
    const endpoint = `${base_url}/bodega/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteBodega(id: any) {
    const endpoint = `${base_url}/bodega/${id}`;
    return this.http.delete(endpoint);
  }

  getBodegaById(id: any) {
    const endpoint = `${base_url}/bodega/${id}`;
    return this.http.get(endpoint);
  }

  getBodegaByDocument(document: string) {
    const endpoint = `${base_url}/bodega/document/${document}`;
    return this.http.get(endpoint);
  }

  exportBodega() {
    const endpoint = `${base_url}/bodega/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

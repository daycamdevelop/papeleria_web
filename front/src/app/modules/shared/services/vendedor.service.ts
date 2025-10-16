import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http: HttpClient) { }

  getVendedor(){
    const endpoint = `${base_url}/vendedor`;
    return this.http.get(endpoint);
  }

  saveVendedor(body: any) {
    const endpoint = `${base_url}/vendedor`;
    return this.http.post(endpoint, body);
  }

  updateVendedor(body: any, id: any){
    const endpoint = `${base_url}/vendedor/ ${id}`;
    return this.http.put(endpoint, body);
  }

  deleteVendedor(id: any){
    const endpoint = `${base_url}/vendedor/ ${id}`;
    return this.http.delete(endpoint);
  }

  getVendedorById(id: any){
    const endpoint = `${base_url}/vendedor/ ${id}`;
    return this.http.get(endpoint);
  }

  exportVendedors(){
    const endpoint = `${base_url}/vendedor/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

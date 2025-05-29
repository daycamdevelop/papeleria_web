import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  /**
   * get all supplier
   */
  getProveedor(){
    const endpoint = `${base_url}/proveedor`;
    return this.http.get(endpoint);
  }

  /**
   * save the supplier
   */
  saveProveedor(body: any) {
    const endpoint = `${base_url}/proveedor`;
    return this.http.post(endpoint, body);
  }

  /**
   * update supplier
   */
  updateProveedor(body: any, id: any){
    const endpoint = `${base_url}/proveedor/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * update supplier
   */
  deleteProveedor(id: any){
    const endpoint = `${base_url}/proveedor/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * update supplier
   */
  getProveedorById(id: any){
    const endpoint = `${base_url}/proveedor/${id}`;
    return this.http.get(endpoint);
  }


  /**
   * export excel supplier
   */
  exportProveedor(){
    const endpoint = `${base_url}/proveedor/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

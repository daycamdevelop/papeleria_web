import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8081/api/v1";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  /**
   * get all supplier
   */
  getSupplier(){

    const endpoint = `${base_url}/supplier`;
    return this.http.get(endpoint);

  }

  /**
   * save the supplier
   */
  saveSupplier(body: any) {
    const endpoint = `${base_url}/supplier`;
    return this.http.post(endpoint, body);
  }

  /**
   * update supplier
   */
  updateSupplier(body: any, id: any){
    const endpoint = `${base_url}/supplier/ ${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * update supplier
   */
  deleteSupplier(id: any){
    const endpoint = `${base_url}/supplier/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * update supplier
   */
  getSupplierById(id: any){
    const endpoint = `${base_url}/supplier/ ${id}`;
    return this.http.get(endpoint);
  }


  /**
   * export excel supplier
   */
  exportSupplier(){
    const endpoint = `${base_url}/supplier/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

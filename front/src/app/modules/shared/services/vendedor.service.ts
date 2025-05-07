import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://186.29.194.235:8081/api/v1";

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http: HttpClient) { }

  /**
   * get all categories
   */
  getCategories(){

    const endpoint = `${base_url}/vendedor`;
    return this.http.get(endpoint);

  }

  /**
   * save the categories
   */
  saveCategorie(body: any) {
    const endpoint = `${base_url}/vendedor`;
    return this.http.post(endpoint, body);
  }

  /**
   * update categorie
   */
  updateCategorie(body: any, id: any){
    const endpoint = `${base_url}/vendedor/ ${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * update categorie
   */
  deleteCategorie(id: any){
    const endpoint = `${base_url}/vendedor/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * update categorie
   */
  getCategorieById(id: any){
    const endpoint = `${base_url}/vendedor/ ${id}`;
    return this.http.get(endpoint);
  }


  /**
   * export excel categories
   */
  exportCategories(){
    const endpoint = `${base_url}/vendedor/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

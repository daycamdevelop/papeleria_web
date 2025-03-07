import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8081/api/v1";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los Productos
   */
  getProduct() {
    const endpoint = `${base_url}/product`;
    return this.http.get(endpoint);
  }

  /**
   * Guarda un Productos
   */
  saveProduct(body: any) {
    const endpoint = `${base_url}/product`;
    return this.http.post(endpoint, body);
  }

  /**
   * Actualiza un Productos
   */
  updateProduct(body: any, id: any) {
    const endpoint = `${base_url}/product/${id}`; // Eliminado el espacio extra
    return this.http.put(endpoint, body);
  }

  /**
   * Elimina un Productos
   */
  deleteProduct(id: any) {
    const endpoint = `${base_url}/product/${id}`; // Eliminado el espacio extra
    return this.http.delete(endpoint);
  }

  /**
   * Obtiene un Product por ID
   */
  getProductById(id: any) {
    const endpoint = `${base_url}/product/${id}`; // Eliminado el espacio extra
    return this.http.get(endpoint);
  }

  /**
   * Busca un Producto por documento
   */
  getProductByDocument(document: string) {
    const endpoint = `${base_url}/product/document/${document}`;
    return this.http.get(endpoint);
  }

  /**
   * Exporta los datos de Productoss a Excel
   */
  exportProduct() {
    const endpoint = `${base_url}/product/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

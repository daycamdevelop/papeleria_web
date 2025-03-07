import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8081/api/v1";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los clientes
   */
  getClient() {
    const endpoint = `${base_url}/client`;
    return this.http.get(endpoint);
  }

  /**
   * Guarda un cliente
   */
  saveClient(body: any) {
    const endpoint = `${base_url}/client`;
    return this.http.post(endpoint, body);
  }

  /**
   * Actualiza un cliente
   */
  updateClient(body: any, id: any) {
    const endpoint = `${base_url}/client/${id}`; // Eliminado el espacio extra
    return this.http.put(endpoint, body);
  }

  /**
   * Elimina un cliente
   */
  deleteClient(id: any) {
    const endpoint = `${base_url}/client/${id}`; // Eliminado el espacio extra
    return this.http.delete(endpoint);
  }

  /**
   * Obtiene un cliente por ID
   */
  getClientById(id: any) {
    const endpoint = `${base_url}/client/${id}`; // Eliminado el espacio extra
    return this.http.get(endpoint);
  }

  /**
   * Busca un cliente por documento
   */
  getClientByDocument(document: string) {
    const endpoint = `${base_url}/client/document/${document}`;
    return this.http.get(endpoint);
  }

  /**
   * Exporta los datos de clientes a Excel
   */
  exportClient() {
    const endpoint = `${base_url}/client/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

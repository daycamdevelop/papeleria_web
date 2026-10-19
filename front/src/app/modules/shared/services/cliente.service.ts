import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los clientes
   */
  getCliente() {
    const endpoint = `${base_url}/cliente`;
    return this.http.get(endpoint);
  }

  /**
   * Guarda un cliente
   */
  saveCliente(body: any) {
    const endpoint = `${base_url}/cliente`;
    return this.http.post(endpoint, body);
  }

  /**
   * Actualiza un cliente
   */
  updateCliente(body: any, id: any) {
    const endpoint = `${base_url}/cliente/${id}`; // Eliminado el espacio extra
    return this.http.put(endpoint, body);
  }

  /**
   * Elimina un cliente
   */
  deleteCliente(id: any) {
    const endpoint = `${base_url}/cliente/${id}`; // Eliminado el espacio extra
    return this.http.delete(endpoint);
  }

  /**
   * Obtiene un cliente por ID
   */
  getClienteById(id: any) {
    const endpoint = `${base_url}/cliente/${id}`; // Eliminado el espacio extra
    return this.http.get(endpoint);
  }

  /**
   * Busca un cliente por documento
   */
  getClienteByDocument(document: string) {
    const endpoint = `${base_url}/cliente/document/${document}`;
    return this.http.get(endpoint);
  }

  /**
   * Exporta los datos de clientes a Excel
   */
  exportCliente() {
    const endpoint = `${base_url}/cliente/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

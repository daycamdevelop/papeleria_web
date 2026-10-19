import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los Usuarios
   */
  getUsuario() {
    const endpoint = `${base_url}/usuario`;
    return this.http.get(endpoint);
  }

  /**
   * Guarda un Usuario
   */
  saveUsuario(body: any) {
    const endpoint = `${base_url}/usuario`;
    return this.http.post(endpoint, body);
  }

  /**
   * Actualiza un Usuario
   */
  updateUsuario(body: any, id: any) {
    const endpoint = `${base_url}/usuario/${id}`; // Eliminado el espacio extra
    return this.http.put(endpoint, body);
  }

  /**
   * Elimina un Usuario
   */
  deleteUsuario(id: any) {
    const endpoint = `${base_url}/usuario/${id}`; // Eliminado el espacio extra
    return this.http.delete(endpoint);
  }

  /**
   * Obtiene un Usuario por ID
   */
  getUsuarioById(id: any) {
    const endpoint = `${base_url}/usuario/${id}`; // Eliminado el espacio extra
    return this.http.get(endpoint);
  }

  /**
   * Busca un Usuario por documento
   */
  getUsuarioByDocument(document: string) {
    const endpoint = `${base_url}/usuario/document/${document}`;
    return this.http.get(endpoint);
  }

  /**
   * Exporta los datos de Usuarios a Excel
   */
  exportUsuario() {
    const endpoint = `${base_url}/usuario/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

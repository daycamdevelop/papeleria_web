import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CierreService {

  constructor(private http: HttpClient) { }

  getCierre(fechaInicio:string, fechaFin:string) {
    const endpoint = `${base_url}/cierre?fechaInicio=`+fechaInicio+`&fechaFin=`+fechaFin;
    return this.http.get(endpoint);
  }

  exportCierre() {
    const endpoint = `${base_url}/cierre/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

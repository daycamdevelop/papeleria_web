import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(private http: HttpClient) { }

  getKardex(codigoSel:string, fechaInicio:string) {
    const endpoint = `${base_url}/kardex?codigoSel=`+codigoSel+`&fechaInicio=`+fechaInicio;
    return this.http.get(endpoint);
  }

  exportKardex() {
    const endpoint = `${base_url}/Kardex/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

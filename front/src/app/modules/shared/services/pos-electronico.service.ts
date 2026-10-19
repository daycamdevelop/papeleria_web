import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PosElectronicoService {

  constructor(private http: HttpClient) { }

  getPosElectronico() {
    const endpoint = `${base_url}/pos_electronico`;
    return this.http.get(endpoint);
  }

  savePosElectronico(body: any) {
    const endpoint = `${base_url}/pos_electronico`;
    return this.http.post(endpoint, body);
  }

  updatePosElectronico(body: any, id: any) {
    const endpoint = `${base_url}/pos_electronico/${id}`;
    return this.http.put(endpoint, body);
  }

  deletePosElectronico(id: any) {
    const endpoint = `${base_url}/pos_electronico/${id}`;
    return this.http.delete(endpoint);
  }

  getPosElectronicoById(id: any) {
    const endpoint = `${base_url}/pos_electronico/${id}`;
    return this.http.get(endpoint);
  }

  getPosElectronicoPDF(numerofactura: any) {
    const endpoint = `${base_url}/pos_electronicoPDF?numerofactura=`+numerofactura;
    return this.http.get(endpoint);
  }

  exportProduct() {
    const endpoint = `${base_url}/pos_electronico/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

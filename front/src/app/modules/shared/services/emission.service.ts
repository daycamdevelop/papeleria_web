import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacturaElectronicaEMission } from '../model/FacturaElectronicaElement';

const base_url = environment.urlEmission;

@Injectable({
  providedIn: 'root'
})
export class EmissionService {

  constructor(private http: HttpClient) { }

  setFacturaElectronica(body: FacturaElectronicaEMission) {
    const endpoint = `${base_url}/invoice`;
    return this.http.post(endpoint, body);
  }

  setPOSElectronico(body: any) {
    const endpoint = `${base_url}/pos`;
    return this.http.post(endpoint, body);
  }

  setCreditNote(body: any) {
    const endpoint = `${base_url}/credit-note`;
    return this.http.post(endpoint, body);
  }

  setPOSCreditNote(body: any) {
    const endpoint = `${base_url}/credit-note-equivalent`;
    return this.http.post(endpoint, body);
  }
}

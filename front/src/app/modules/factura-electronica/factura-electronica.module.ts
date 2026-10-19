import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaElectronicaComponent } from './factura-electronica/factura-electronica.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { FacturaElectronicaRoutingModule } from './factura-electronica-routing.module';
import { HistorialFacturaElectronicaComponent } from './historial-factura-electronica/historial-factura-electronica.component';

@NgModule({
  declarations: [
    HistorialFacturaElectronicaComponent,
    FacturaElectronicaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FacturaElectronicaRoutingModule,
    LoadingComponent
  ]
})
export class FacturaElectronicaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasComponent } from './facturas/facturas.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { FacturasRoutingModule } from './facturas-routing.module';
import { HistorialFacturaComponent } from './historial-factura/historial-factura.component';

@NgModule({
  declarations: [
    HistorialFacturaComponent,
    FacturasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FacturasRoutingModule,
    LoadingComponent
  ]
})
export class FacturasModule { }

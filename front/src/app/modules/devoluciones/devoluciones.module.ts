import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { DevolucionesRoutingModule } from './devoluciones-routing.module';
import { DevolucionFacturaComponent } from './devolucion-factura/devolucion-factura.component';

@NgModule({
  declarations: [
    DevolucionFacturaComponent,
    DevolucionesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DevolucionesRoutingModule,
    LoadingComponent
  ]
})
export class DevolucionesModule { }

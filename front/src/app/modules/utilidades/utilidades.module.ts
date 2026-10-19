import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilidadesComponent } from './utilidades/utilidades.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilidadesRoutingModule } from '../utilidades/utilidades-routing.module';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { IReportBoolsComponent } from './IreportBools/ireportbools.component';
import { IReportCajasComponent } from './IreportCajas/ireportcajas.component';

@NgModule({
  declarations: [
    IReportBoolsComponent,
    IReportCajasComponent,
    UtilidadesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UtilidadesRoutingModule,
    LoadingComponent
  ]
})
export class UtilidadesModule { }

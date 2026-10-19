import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CierreComponent } from './cierre/cierre.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { CierreRoutingModule } from './cierre-routing.module';

@NgModule({
  declarations: [
    CierreComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CierreRoutingModule,
    LoadingComponent
  ]
})
export class CierreModule { }
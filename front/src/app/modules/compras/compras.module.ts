import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent } from './compras/compras.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComprasRoutingModule } from '../compras/compras-routing.module';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@NgModule({
  declarations: [
    ComprasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComprasRoutingModule,
    LoadingComponent
  ]
})
export class ComprasModule { }

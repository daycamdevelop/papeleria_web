import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KardexComponent } from './kardex/kardex.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { KardexRoutingModule } from './kardex-routing.module';

@NgModule({
  declarations: [
    KardexComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    KardexRoutingModule,
    LoadingComponent
  ]
})
export class KardexModule { }

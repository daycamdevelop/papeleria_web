import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosElectronicoComponent } from './pos-electronico/pos-electronico.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { PosElectronicoRoutingModule } from './pos-electronico-routing.module';

@NgModule({
  declarations: [
    PosElectronicoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PosElectronicoRoutingModule,
    LoadingComponent
  ]
})
export class PosElectronicoModule { }

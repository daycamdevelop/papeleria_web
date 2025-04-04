import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewVendedorComponent } from './components/new-vendedor/new-vendedor.component';
import { VendedorRoutingModule } from './vendedor-routing.module';


@NgModule({
  declarations: [
    VendedorComponent,
    NewVendedorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VendedorRoutingModule
  ]
})
export class VendedorModule { }

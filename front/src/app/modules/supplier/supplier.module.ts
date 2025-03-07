import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { SupplierComponent } from './supplier/supplier.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component'; // Agrega este si existe
import { SupplierRoutingModule } from './supplier-routing.module'; // Importa el enrutamiento

@NgModule({
  declarations: [
    SupplierComponent,
    NewSupplierComponent // Asegúrate de que esta declaración existe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SupplierRoutingModule // Agrega el enrutamiento
  ]
})
export class SupplierModule {}

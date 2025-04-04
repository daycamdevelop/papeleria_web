import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { NewProveedorComponent } from './new-proveedor/new-proveedor.component'; // Agrega este si existe
import { ProveedorRoutingModule } from './proveedor-routing.module'; // Importa el enrutamiento

@NgModule({
  declarations: [
    ProveedorComponent,
    NewProveedorComponent // Asegúrate de que esta declaración existe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProveedorRoutingModule // Agrega el enrutamiento
  ]
})
export class ProveedorModule {}

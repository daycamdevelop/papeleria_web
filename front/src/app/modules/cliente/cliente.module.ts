import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ClienteComponent } from './cliente/cliente.component';
import { NewClienteComponent } from './new-cliente/new-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module'; // Importa el enrutamiento

@NgModule({
  declarations: [
    ClienteComponent,
    NewClienteComponent    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule // Agrega el enrutamiento
  ]
})
export class ClienteModule {}

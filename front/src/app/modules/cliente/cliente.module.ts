import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ClienteComponent } from './cliente/cliente.component';
import { NewClienteComponent } from './new-cliente/new-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module'; // Importa el enrutamiento
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { SelectClienteComponent } from './select-cliente/select-cliente.component';

@NgModule({
  declarations: [
    ClienteComponent,
    NewClienteComponent,
    SelectClienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    LoadingComponent
  ]
})
export class ClienteModule {}

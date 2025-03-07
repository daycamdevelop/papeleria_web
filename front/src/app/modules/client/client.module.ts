import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ClientComponent } from './client/client.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientRoutingModule } from './client-routing.module'; // Importa el enrutamiento

@NgModule({
  declarations: [
    ClientComponent,
    NewClientComponent    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule // Agrega el enrutamiento
  ]
})
export class ClientModule {}

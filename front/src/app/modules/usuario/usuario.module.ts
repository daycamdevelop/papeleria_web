import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { NewUsuarioComponent } from './new-usuario/new-usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module'; // Importa el enrutamiento
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { SelectUsuarioComponent } from './select-usuario/select-usuario.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    NewUsuarioComponent,
    SelectUsuarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    LoadingComponent
  ]
})
export class UsuarioModule {}

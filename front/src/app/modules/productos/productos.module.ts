import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from '../productos/productos-routing.module';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductosRoutingModule,
    LoadingComponent
  ]
})
export class ProductosModule { }

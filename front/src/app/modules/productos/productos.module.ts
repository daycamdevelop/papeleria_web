import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from '../productos/productos-routing.module';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { BodegaComponent } from './bodega/bodega.component';
import { LineaComponent } from './linea/linea.component';

@NgModule({
  declarations: [
    ProductosComponent,
    BodegaComponent,
    LineaComponent
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

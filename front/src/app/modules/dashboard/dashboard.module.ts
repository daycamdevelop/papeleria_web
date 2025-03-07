import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';
import { ClientModule } from '../client/client.module';
import { ProductModule } from '../product/product.module';
import { SupplierModule } from '../supplier/supplier.module';
import { DashboardRoutingModule } from './dashboard-routing.module'; // Importa el módulo de rutas

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryModule,
    ClientModule,
    SupplierModule,
    ProductModule,
    DashboardRoutingModule // Agrega el módulo de rutas
  ]
})
export class DashboardModule {}

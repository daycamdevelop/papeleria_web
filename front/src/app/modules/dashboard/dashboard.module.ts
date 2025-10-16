import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { VendedorModule } from '../vendedor/vendedor.module';
import { ClienteModule } from '../cliente/cliente.module';
import { ProductosModule } from '../productos/productos.module';
import { ProveedorModule } from '../proveedor/proveedor.module';
import { DashboardRoutingModule } from './dashboard-routing.module'; // Importa el módulo de rutas
import { ComprasModule } from '../compras/compras.module';
import { FacturasModule } from '../facturas/facturas.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VendedorModule,
    ClienteModule,
    ComprasModule,
    FacturasModule,
    ProveedorModule,
    ProductosModule,
    DashboardRoutingModule // Agrega el módulo de rutas
  ]
})
export class DashboardModule {}

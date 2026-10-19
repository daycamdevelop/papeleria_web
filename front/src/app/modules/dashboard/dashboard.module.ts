import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { VendedorModule } from '../vendedor/vendedor.module';
import { ClienteModule } from '../cliente/cliente.module';
import { ProductosModule } from '../productos/productos.module';
import { ProveedorModule } from '../proveedor/proveedor.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComprasModule } from '../compras/compras.module';
import { FacturasModule } from '../facturas/facturas.module';
import { FacturaElectronicaModule } from '../factura-electronica/factura-electronica.module';

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
    FacturaElectronicaModule,
    ProveedorModule,
    ProductosModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}

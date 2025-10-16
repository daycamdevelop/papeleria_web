import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vendedor', loadChildren: () => import('../vendedor/vendedor.module').then(m => m.VendedorModule) },
  { path: 'cliente', loadChildren: () => import('../cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'compras', loadChildren: () => import('../compras/compras.module').then(m => m.ComprasModule) },
  { path: 'facturas', loadChildren: () => import('../facturas/facturas.module').then(m => m.FacturasModule) },
  { path: 'productos', loadChildren: () => import('../productos/productos.module').then(m => m.ProductosModule) },
  { path: 'proveedor', loadChildren: () => import('../proveedor/proveedor.module').then(m => m.ProveedorModule) },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
 
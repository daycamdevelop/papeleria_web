import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vendedor', loadChildren: () => import('../vendedor/vendedor.module').then(m => m.VendedorModule) },
  { path: 'cliente', loadChildren: () => import('../cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'proveedor', loadChildren: () => import('../proveedor/proveedor.module').then(m => m.ProveedorModule) },
  { path: 'productos', loadChildren: () => import('../productos/productos.module').then(m => m.ProductosModule) }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
 
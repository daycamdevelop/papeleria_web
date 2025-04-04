import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './proveedor/proveedor.component';

const routes: Routes = [
  { path: '', component: ProveedorComponent } // Ruta predeterminada para proveedores
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule {}

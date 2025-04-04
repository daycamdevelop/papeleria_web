import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendedorComponent } from './components/vendedor/vendedor.component';

const routes: Routes = [
  { path: '', component: VendedorComponent } // Ruta base para este módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configuración de rutas hijas
  exports: [RouterModule]
})
export class VendedorRoutingModule {}

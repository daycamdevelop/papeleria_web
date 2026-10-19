import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './facturas/facturas.component';

const childRoutes: Routes = [
  { path: '', component: FacturasComponent },
  { path: 'historial', loadChildren: () => import('./facturas/facturas.component').then(m => m.FacturasComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
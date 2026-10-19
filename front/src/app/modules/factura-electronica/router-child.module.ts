import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaElectronicaComponent } from './factura-electronica/factura-electronica.component';

const childRoutes: Routes = [
  { path: '', component: FacturaElectronicaComponent },
  { path: 'historial', loadChildren: () => import('./historial-factura-electronica/historial-factura-electronica.component').then(m => m.HistorialFacturaElectronicaComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
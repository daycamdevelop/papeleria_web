import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaElectronicaComponent } from './factura-electronica/factura-electronica.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { HistorialFacturaElectronicaComponent } from './historial-factura-electronica/historial-factura-electronica.component';

const routes: Routes = [
  { path: '', component: FacturaElectronicaComponent },
  {
    path: 'historial',
    component: HistorialFacturaElectronicaComponent
  },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaElectronicaRoutingModule {}

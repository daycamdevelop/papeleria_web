import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilidadesComponent } from './utilidades/utilidades.component';

const childRoutes: Routes = [
  { path: '', component: UtilidadesComponent },
  { path: 'ireportbools', loadChildren: () => import('./IreportBools/ireportbools.component').then(m => m.IReportBoolsComponent) },
  { path: 'ireportcajas', loadChildren: () => import('./IreportCajas/ireportcajas.component').then(m => m.IReportCajasComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
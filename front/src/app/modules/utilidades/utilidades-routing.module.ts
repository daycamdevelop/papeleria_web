import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilidadesComponent } from './utilidades/utilidades.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { IReportBoolsComponent } from './IreportBools/ireportbools.component';
import { IReportCajasComponent } from './IreportCajas/ireportcajas.component';

const routes: Routes = [
  { path: '', component: UtilidadesComponent },
  {
    path: 'ireportbools',
    component: IReportBoolsComponent
  },
  {
    path: 'ireportcajas',
    component: IReportCajasComponent
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
export class UtilidadesRoutingModule {}

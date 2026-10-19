import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: DevolucionesComponent },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucionesRoutingModule {}

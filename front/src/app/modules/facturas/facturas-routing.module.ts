import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './facturas/facturas.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: FacturasComponent },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule {}

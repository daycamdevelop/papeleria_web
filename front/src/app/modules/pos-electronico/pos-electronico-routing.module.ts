import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosElectronicoComponent } from './pos-electronico/pos-electronico.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: PosElectronicoComponent },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosElectronicoRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CierreComponent } from './cierre/cierre.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: CierreComponent },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CierreRoutingModule {}

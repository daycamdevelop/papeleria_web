import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KardexComponent } from './kardex/kardex.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: KardexComponent },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KardexRoutingModule {}

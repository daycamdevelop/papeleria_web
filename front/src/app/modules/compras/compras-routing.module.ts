import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras/compras.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { MasivoComponent } from './masivo/masivo.component';

const routes: Routes = [
  { path: '', component: ComprasComponent },
  {
    path: 'masivo',
    component: MasivoComponent
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
export class ComprasRoutingModule {}

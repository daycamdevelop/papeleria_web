import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras/compras.component';

const childRoutes: Routes = [
  { path: '', component: ComprasComponent },
  { path: 'masivo', loadChildren: () => import('./masivo/masivo.component').then(m => m.MasivoComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
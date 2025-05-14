import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { ModalAyudaDialog } from './pages/modalAyuda/modal-ayuda.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
  },
  {
    path: 'modalayuda',
    component: ModalAyudaDialog,
    loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

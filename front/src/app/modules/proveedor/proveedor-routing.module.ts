import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: ProveedorComponent },
    {
      path: 'loading',
      component: LoadingComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule {}

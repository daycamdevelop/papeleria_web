import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: VendedorComponent },
    {
      path: 'loading',
      component: LoadingComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configuración de rutas hijas
  exports: [RouterModule]
})
export class VendedorRoutingModule {}

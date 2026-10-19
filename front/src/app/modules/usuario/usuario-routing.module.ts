import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', component: UsuarioComponent },
  {
    path: 'loading',
    component: LoadingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full' // Redirige la raíz al dashboard
  },
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: '/dashboard' } // Redirige cualquier ruta no válida al dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Habilita `useHash` para rutas con hash
  exports: [RouterModule]
})
export class AppRoutingModule {}

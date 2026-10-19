import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full' // Redirige la raíz al dashboard
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: '**', 
    redirectTo: '/dashboard',
  } // Redirige cualquier ruta no válida al dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Habilita `useHash` para rutas con hash
  exports: [RouterModule]
})
export class AppRoutingModule {}

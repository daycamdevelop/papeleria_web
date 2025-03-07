import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  { path: '', component: CategoryComponent } // Ruta base para este módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configuración de rutas hijas
  exports: [RouterModule]
})
export class CategoryRoutingModule {}

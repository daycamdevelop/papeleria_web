import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule) },
  { path: 'client', loadChildren: () => import('../client/client.module').then(m => m.ClientModule) },
  { path: 'supplier', loadChildren: () => import('../supplier/supplier.module').then(m => m.SupplierModule) },
  { path: 'product', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RouterChildModule {}
 
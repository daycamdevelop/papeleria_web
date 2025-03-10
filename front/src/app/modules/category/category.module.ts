import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { CategoryRoutingModule } from './category-routing.module';


@NgModule({
  declarations: [
    CategoryComponent,
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }

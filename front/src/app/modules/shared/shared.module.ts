import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { EditValueComponent } from './components/edit-value/edit-value.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmComponent,
    EditValueComponent
  ],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SharedModule { }

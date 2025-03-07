import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ClientService } from '../../services/client.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  private categoryService= inject(CategoryService);
  private clientService= inject(ClientService);
  private supplierService= inject(SupplierService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);


  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null){     
      
      if (this.data.module == "category") {
        this.categoryService.deleteCategorie(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
      }else if (this.data.module == "client") {
        this.clientService.deleteClient(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
      }else if (this.data.module == "supplier") {
        this.supplierService.deleteSupplier(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
      }
    } else {
      this.dialogRef.close(2);
    }
  }

}

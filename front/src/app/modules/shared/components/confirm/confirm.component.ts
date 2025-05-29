import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendedorService } from '../../services/vendedor.service';
import { ClienteService } from '../../services/cliente.service';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  private vendedorService= inject(VendedorService);
  private clientService= inject(ClienteService);
  private proveedorService= inject(ProveedorService);
  private productService= inject(ProductService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null){     
      if (this.data.module == "category") {
        this.vendedorService.deleteCategorie(this.data.id).
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
      }else if (this.data.module == "proveedor") {
        this.proveedorService.deleteProveedor(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
      }else if (this.data.module == "product") {
        this.productService.deleteProduct(this.data.id).
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

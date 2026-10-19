import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendedorService } from '../../services/vendedor.service';
import { ClienteService } from '../../services/cliente.service';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  private vendedorService= inject(VendedorService);
  private clienteService= inject(ClienteService);
  private proveedorService= inject(ProveedorService);
  private productoService= inject(ProductoService);
  private usuarioService= inject(UsuarioService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null){     
      if (this.data.module == "category") {
        this.vendedorService.deleteVendedor(this.data.id).
        subscribe( (data:any) =>{
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
      }else if (this.data.module == "cliente") {
        this.clienteService.deleteCliente(this.data.id).
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
      }else if (this.data.module == "producto") {
        this.productoService.deleteProduct(this.data.id).
        subscribe( (data:any) =>{
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
      }else if (this.data.module == "usuario") {
        this.usuarioService.deleteUsuario(this.data.id).
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

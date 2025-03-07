import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupplierService } from '../../shared/services/supplier.service';
import { NewSupplierComponent } from '../new-supplier/new-supplier.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent implements OnInit{
  constructor(private router: Router) {}

  private supplierService = inject(SupplierService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getSupplier();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['id', 'name', 'document', 't_document', 'phone', 'address', 'email', 'estado', 'actions'];
  dataSource = new MatTableDataSource<SupplierElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getSupplier(): void {
    this.supplierService.getSupplier()
      .subscribe( (data:any) => {
        console.log("respuesta proveerdor: ", data);
        this.processSupplierResponse(data);

      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processSupplierResponse(resp: any){

    const dataSupplier: SupplierElement[] = [];

    if( resp.metadata[0].code == "00") {
      let listSupplier = resp.supplierResponse.supplier;
      listSupplier.forEach((element: SupplierElement) => {
        dataSupplier.push(element);
      });
      this.dataSource = new MatTableDataSource<SupplierElement>(dataSupplier);
      this.dataSource.paginator = this.paginator;      
    }

  }

  openSupplierDialog(){
    const dialogRef = this.dialog.open(NewSupplierComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '60%', // Opcional: establece la altura
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Proveedor Agregado", "Exitoso");
        this.getSupplier();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar el proveedor", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

  edit(id:number, name: string, document: string, t_document: string, phone: string, address: string, email: string, estado: string, departamento: string, ciudad: string){
    const dialogRef = this.dialog.open(NewSupplierComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '60%', // Opcional: establece la altura
      data: {id: id, name: name, document: document, t_document: t_document, phone: phone, address: address, email: email, estado: estado, departamento: departamento, ciudad: ciudad}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result == 1){
        this.openSnackBar("Proveedor Actualizado", "Exitoso");
        this.getSupplier();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar proveedor", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {id: id, module: "supplier"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Proveedor Eliminado", "Exitoso");
        this.getSupplier();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar proveedor", "Error");
      }
    });
  }


}

export interface SupplierElement {
  id: number;
  name: string;
  document: string;
  t_document: string;
  phone: number;
  address: string;
  email: string;
  estado: string;
  departamento: string;
  ciudad: string;
}

import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProveedorService } from '../../shared/services/proveedor.service';
import { NewProveedorComponent } from '../new-proveedor/new-proveedor.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})

export class ProveedorComponent implements OnInit{
  constructor(private router: Router) {}

  private proveedorService = inject(ProveedorService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.getProveedor();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['id', 'name', 'document', 't_document', 'phone', 'address', 'email', 'estado', 'actions'];
  dataSource = new MatTableDataSource<ProveedorElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProveedor(): void {
    this.proveedorService.getProveedor()
      .subscribe( (data:any) => {
        this.processProveedorResponse(data);
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processProveedorResponse(resp: any){

    const listProveedor: ProveedorElement[] = [];

    if( resp.metadata[0].code == "200") {
      let listProveedor = resp.proveedorResponse.proveedor;
      listProveedor.forEach((element: ProveedorElement) => {
        listProveedor.push(element);
      });
      this.dataSource = new MatTableDataSource<ProveedorElement>(listProveedor);
      this.dataSource.paginator = this.paginator;      
    }

  }

  openProveedorDialog(){
    const dialogRef = this.dialog.open(NewProveedorComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '60%', // Opcional: establece la altura
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Proveedor Agregado", "Exitoso");
        this.getProveedor();
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
    const dialogRef = this.dialog.open(NewProveedorComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '60%', // Opcional: establece la altura
      data: {id: id, name: name, document: document, t_document: t_document, phone: phone, address: address, email: email, estado: estado, departamento: departamento, ciudad: ciudad}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if(result == 1){
        this.openSnackBar("Proveedor Actualizado", "Exitoso");
        this.getProveedor();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar proveedor", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {id: id, module: "proveedor"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Proveedor Eliminado", "Exitoso");
        this.getProveedor();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar proveedor", "Error");
      }
    });
  }


}

export interface ProveedorElement {
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

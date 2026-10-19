import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { VendedorService } from 'src/app/modules/shared/services/vendedor.service';
import { NewVendedorComponent } from '../new-vendedor/new-vendedor.component';
import { VendedorElement } from 'src/app/modules/shared/model/VendedorElement';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit{
  constructor(private router: Router) {}

  private vendedorService = inject(VendedorService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.getVendedors();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['id', 'nombre', 'nit', 'direccion', 'telefono', 'celular', 'correo', 'estado', 'actions'];
  dataSource = new MatTableDataSource<VendedorElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getVendedors(): void {
    this.vendedorService.getVendedor()
      .subscribe( (data:any) => {
        this.processVendedorsResponse(data);
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processVendedorsResponse(resp: any){
    const dataCategory: VendedorElement[] = [];
    if( resp.metadata[0].code == "200") {
      resp.vendedorResponse.vendedor.forEach((element: VendedorElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<VendedorElement>(dataCategory.sort((a,b)=>(a.id ? a.id : 0) - (b.id ? b.id : 0)));
      this.dataSource.paginator = this.paginator; 
    }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewVendedorComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '70%', // Opcional: establece la altura
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Vendedor Agregada", "Exitosa");
        this.getVendedors();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar vendedor", "Error");
      }
    });
  }

  edit(id:number, nombre: string, nit: string, telefono: string, celular:string, direccion: string, correo: string, estado: string){
    const dialogRef = this.dialog.open(NewVendedorComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '70%', // Opcional: establece la altura
      data: {id: id, nombre: nombre, nit: nit, telefono: telefono, celular: celular, direccion: direccion, correo: correo, estado: estado}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Vendedor Actualizada", "Exitosa");
        this.getVendedors();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar vendedor", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {id: id, module: "category"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Vendedor Eliminada", "Exitosa");
        this.getVendedors();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar vendedor", "Error");
      }
    });
  }

  buscar( termino: string){

    if( termino.length === 0){
      return this.getVendedors();
    }

    this.vendedorService.getVendedorById(termino)
    .subscribe( (resp: any) => {
      this.processVendedorsResponse(resp);
    })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}

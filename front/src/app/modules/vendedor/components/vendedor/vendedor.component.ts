import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { VendedorService } from 'src/app/modules/shared/services/vendedor.service';
import { NewVendedorComponent } from '../new-vendedor/new-vendedor.component';

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
    this.getCategories();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['id', 'name', 'document', 't_document', 'phone', 'address', 'email', 'estado', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void {

    this.vendedorService.getCategories()
      .subscribe( (data:any) => {
        this.processCategoriesResponse(data);
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "200") {

      let listCategory = resp.vendedorResponse.vendedor;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
      
    }

  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewVendedorComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '60%', // Opcional: establece la altura
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Vendedor Agregada", "Exitosa");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar vendedor", "Error");
      }
    });
  }

  edit(id:number, name: string, document: string, t_document: string, phone: string, address: string, email: string, estado: string, departamento: string, ciudad: string){
    const dialogRef = this.dialog.open(NewVendedorComponent , {
      width: '100%', // Cambia el ancho del modal
      height: '60%', // Opcional: establece la altura
      data: {id: id, name: name, document: document, t_document: t_document, phone: phone, address: address, email: email, estado: estado, departamento: departamento, ciudad: ciudad}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Vendedor Actualizada", "Exitosa");
        this.getCategories();
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
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar vendedor", "Error");
      }
    });
  }

  buscar( termino: string){

    if( termino.length === 0){
      return this.getCategories();
    }

    this.vendedorService.getCategorieById(termino)
            .subscribe( (resp: any) => {
              this.processCategoriesResponse(resp);
            })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from '../../shared/services/cliente.service';
import { Subject } from 'rxjs';
import { ClientElement } from '../../shared/model/ClienteElement';

@Component({
  selector: 'app-devolucion-factura',
  templateUrl: './devolucion-factura.component.html',
  styleUrls: ['./devolucion-factura.component.css']
})
export class DevolucionFacturaComponent implements OnInit {
  constructor(private router: Router) {}

  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public data = inject(MAT_DIALOG_DATA);
  public loading = false;
  public listClient:ClientElement[] = [];

  searchSubject = new Subject<string>(); // Observable para manejar debounce
  displayedColumns: string[] = ['numfact', 'id', 'producto', 'nombre', 'catidadproductos', 'precio_unitario', 'cantidaddevolver', 'preciototal'];
  dataSource = new MatTableDataSource<ClientElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading = true;

    console.log(this.data)
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  llenarTabla(dataClient:ClientElement[]){
    this.dataSource = new MatTableDataSource<ClientElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  onSearch(text: string): void {
    this.llenarTabla(this.listClient.filter((cli)=>{
      return cli.nombre.includes(text)||cli.nit.includes(text)
    }));
    /*
    // Maneja la búsqueda al escribir
    this.searchSubject.next(document.trim());*/
  }

  searchByDocument(document: string): void {
    this.clienteService.getClienteByDocument(document).subscribe(
      (data: any) => {
        if (data.metadata[0].code === '00') {
          const client = data.clientResponse.client; // Asegúrate de que esto sea un arreglo
          this.dataSource = new MatTableDataSource<ClientElement>(client); // Configura la tabla con los datos
        } else {
          this.openSnackBar('No se encontró un cliente con ese documento.', 'Error');
          this.dataSource = new MatTableDataSource<ClientElement>([]); // Limpia la tabla
        }
      },
      (error: any) => {
        console.error('Error en la búsqueda:', error);
        this.openSnackBar('Error al buscar el cliente.', 'Error');
      }
    );
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
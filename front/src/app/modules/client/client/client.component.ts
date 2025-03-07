import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { NewClientComponent } from '../new-client/new-client.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private router: Router) {}

  private clientService = inject(ClientService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  searchSubject = new Subject<string>(); // Observable para manejar debounce
  displayedColumns: string[] = ['id', 'name', 'document', 't_document', 'phone', 'address', 'email', 'estado', 'actions'];
  dataSource = new MatTableDataSource<ClientElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getClient();

    // Configuración del debounce para la búsqueda
    this.searchSubject.pipe(debounceTime(300)).subscribe((document: string) => {
      if (document.length > 2) {
        this.searchByDocument(document);
      } else {
        this.getClient(); // Si el texto es menor a 3 caracteres, carga todos los clientes
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  getClient(): void {
    this.clientService.getClient().subscribe(
      (data: any) => {
        this.processClientResponse(data);
      },
      (error: any) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  processClientResponse(resp: any): void {
    const dataClient: ClientElement[] = [];
    if (resp.metadata[0].code === '00') {
      const listClient = resp.clientResponse.client;
      listClient.forEach((element: ClientElement) => {
        dataClient.push(element);
      });
      this.dataSource = new MatTableDataSource<ClientElement>(dataClient);
      this.dataSource.paginator = this.paginator;
    }
  }

  onSearch(document: string): void {
    // Maneja la búsqueda al escribir
    this.searchSubject.next(document.trim());
  }

  searchByDocument(document: string): void {
    this.clientService.getClientByDocument(document).subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data); // Revisa la estructura de los datos
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
  

  openClientDialog(): void {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '100%',
      height: '60%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Cliente Agregado', 'Exitoso');
        this.getClient();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al guardar el cliente', 'Error');
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  edit(id: number, name: string, document: string, t_document: string, phone: string, address: string, email: string, estado: string, valor_credito: string, fecha_credito: string, departamento: string, ciudad: string): void {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '100%',
      height: '60%',
      data: { id, name, document, t_document, phone, address, email, estado, valor_credito, fecha_credito, departamento, ciudad }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Cliente Actualizado', 'Exitoso');
        this.getClient();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al actualizar cliente', 'Error');
      }
    });
  }

  delete(id: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id, module: 'client' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Cliente Eliminado', 'Exitoso');
        this.getClient();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al eliminar cliente', 'Error');
      }
    });
  }
}

export interface ClientElement {
  id: number;
  name: string;
  document: string;
  t_document: string;
  phone: string;
  address: string;
  email: string;
  estado: string;
  valor_credito: string;
  fecha_credito: string;
  departamento: string;
  ciudad: string;
}

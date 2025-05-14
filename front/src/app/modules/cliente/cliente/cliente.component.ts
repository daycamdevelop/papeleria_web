import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from '../../shared/services/cliente.service';
import { NewClienteComponent } from '../new-cliente/new-cliente.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  constructor(private router: Router) {}

  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;

  searchSubject = new Subject<string>(); // Observable para manejar debounce
  displayedColumns: string[] = ['id', 'name', 'document', 't_document', 'phone', 'address', 'email', 'estado', 'actions'];
  dataSource = new MatTableDataSource<ClientElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading = true;
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
    this.clienteService.getClient().subscribe(
      (data: any) => {
        this.loading = false;
        this.processClientResponse(data);
      },
      (error: any) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  processClientResponse(resp: any): void {
    const dataClient: ClientElement[] = [];
    if (resp.metadata[0].code === '200') {
      const listClient = resp.clienteResponse.cliente;
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
    this.clienteService.getClientByDocument(document).subscribe(
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

  openClientDialog(): void {
    const dialogRef = this.dialog.open(NewClienteComponent, {
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
    const dialogRef = this.dialog.open(NewClienteComponent, {
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
  nombre: string;
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

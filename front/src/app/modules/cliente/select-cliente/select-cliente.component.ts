import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';
import { ClientElement } from '../../shared/model/ClienteElement';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-cliente',
  templateUrl: './select-cliente.component.html',
  styleUrls: ['./select-cliente.component.css']
})
export class SelectClienteComponent implements OnInit {

  private dialogRef = inject(MatDialogRef);
  private clienteService = inject(ClienteService);
  public data = inject(MAT_DIALOG_DATA);
  public dialog = inject(MatDialog);
  public loading = false;
  public listClient:ClientElement[] = [];

  searchSubject = new Subject<string>(); // Observable para manejar debounce
  displayedColumns: string[] = ['id', 'name', 'nit', 'phone', 'address', 'email', 'estado', 'dv', 'tipo', 'tipopersona', 'ciudaddane', 'tipoiva'];
  dataSource = new MatTableDataSource<ClientElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.loading = true;
    this.getClient();
  }

  getClient(): void {
    this.clienteService.getCliente().subscribe(
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
      this.listClient = resp.clienteResponse.cliente;
      this.listClient.forEach((element: ClientElement) => {
        dataClient.push(element);
      });
      this.llenarTabla(dataClient);
    }
  }

  llenarTabla(dataClient:ClientElement[]){
    this.dataSource = new MatTableDataSource<ClientElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  onSearch(text: string): void {
    this.llenarTabla(this.listClient.filter((cli)=>{
      return cli.nombre.includes(text)||cli.nit.includes(text)
    }));
  }

  seleccionTabla(cliente:ClientElement){
    this.dialogRef.close(cliente);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

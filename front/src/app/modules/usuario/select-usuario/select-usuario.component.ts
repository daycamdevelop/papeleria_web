import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';
import { UsuarioElement } from '../../shared/model/UsuarioElement';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-usuario',
  templateUrl: './select-usuario.component.html',
  styleUrls: ['./select-usuario.component.css']
})
export class SelectUsuarioComponent implements OnInit {

  private dialogRef = inject(MatDialogRef);
  private usuarioService = inject(UsuarioService);
  public data = inject(MAT_DIALOG_DATA);
  public dialog = inject(MatDialog);
  public loading = false;
  public listClient:UsuarioElement[] = [];

  searchSubject = new Subject<string>(); // Observable para manejar debounce
  displayedColumns: string[] = ['id', 'name', 'nit', 'phone', 'address', 'email', 'estado'];
  dataSource = new MatTableDataSource<UsuarioElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.loading = true;
    this.getClient();
  }

  getClient(): void {
    this.usuarioService.getUsuario().subscribe(
      (data: any) => {
        this.loading = false;
        this.processClientResponse(data);
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  processClientResponse(resp: any): void {
    const dataClient: UsuarioElement[] = [];
    if (resp.metadata[0].code === '200') {
      this.listClient = resp.usuarioResponse.usuario;
      this.listClient.forEach((element: UsuarioElement) => {
        dataClient.push(element);
      });
      this.llenarTabla(dataClient);
    }
  }

  llenarTabla(dataClient:UsuarioElement[]){
    this.dataSource = new MatTableDataSource<UsuarioElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  onSearch(text: string): void {
    this.llenarTabla(this.listClient.filter((cli)=>{
      return cli.nombres.includes(text)||cli.numero_documento.includes(text)
    }));
  }

  seleccionTabla(usuario:UsuarioElement){
    this.dialogRef.close(usuario);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

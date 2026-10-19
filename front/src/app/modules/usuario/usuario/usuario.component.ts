import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from '../../shared/services/usuario.service';
import { NewUsuarioComponent } from '../new-usuario/new-usuario.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UsuarioElement } from '../../shared/model/UsuarioElement';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  constructor(private router: Router) {}

  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  public listUsuario:UsuarioElement[] = [];

  searchSubject = new Subject<string>(); // Observable para manejar debounce
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'tipo_documento', 'numero_documento', 'usuarionombre', 'pass', 'estado', 'rol', 'desvincular', 'actions'];
  dataSource = new MatTableDataSource<UsuarioElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading = true;
    this.getUsuario();

    // Configuración del debounce para la búsqueda
    this.searchSubject.pipe(debounceTime(300)).subscribe((document: string) => {
      if (document.length > 2) {
        this.searchByDocument(document);
      } else {
        this.getUsuario(); // Si el texto es menor a 3 caracteres, carga todos los usuarios
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  getUsuario(): void {
    this.usuarioService.getUsuario().subscribe(
      (data: any) => {
        this.loading = false;
        this.processUsuarioResponse(data);
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  processUsuarioResponse(resp: any): void {
    const dataUsuario: UsuarioElement[] = [];
    if (resp.metadata[0].code === '200') {
      this.listUsuario = resp.usuarioResponse.usuario;
      this.listUsuario.forEach((element: UsuarioElement) => {
        dataUsuario.push(element);
      });
      this.llenarTabla(dataUsuario);
    }
  }

  llenarTabla(dataUsuario:UsuarioElement[]){
    this.dataSource = new MatTableDataSource<UsuarioElement>(dataUsuario);
    this.dataSource.paginator = this.paginator;
  }

  onSearch(text: string): void {
    this.llenarTabla(this.listUsuario.filter((cli)=>{
      return cli.nombres.includes(text)||cli.numero_documento.includes(text)
    }));
    /*
    // Maneja la búsqueda al escribir
    this.searchSubject.next(document.trim());*/
  }

  searchByDocument(document: string): void {
    this.usuarioService.getUsuarioByDocument(document).subscribe(
      (data: any) => {
        if (data.metadata[0].code === '00') {
          const client = data.clientResponse.client; // Asegúrate de que esto sea un arreglo
          this.dataSource = new MatTableDataSource<UsuarioElement>(client); // Configura la tabla con los datos
        } else {
          this.openSnackBar('No se encontró un usuario con ese documento.', 'Error');
          this.dataSource = new MatTableDataSource<UsuarioElement>([]); // Limpia la tabla
        }
      },
      (error: any) => {
        console.error('Error en la búsqueda:', error);
        this.openSnackBar('Error al buscar el usuario.', 'Error');
      }
    );
  }  

  openUsuarioDialog(): void {
    const dialogRef = this.dialog.open(NewUsuarioComponent, {
      width: '100%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Usuario Agregado', 'Exitoso');
        this.getUsuario();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al guardar el usuario', 'Error');
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  edit(id: number): void {
    let usuario:UsuarioElement | undefined = this.listUsuario.find((lc)=>lc.id==id);
    if(usuario){
      const dialogRef = this.dialog.open(NewUsuarioComponent, {
        width: '100%',
        height: '70%',
        data: { 
          id, 
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          tipo_documento: usuario.tipo_documento,
          numero_documento: usuario.numero_documento,
          usuarionombre: usuario.usuarionombre,
          pass: usuario.pass,
          estado: usuario.estado, 
          rol: usuario.rol, 
          desvincular: usuario.desvincular
        }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result === 1) {
          this.openSnackBar('Usuario Actualizado', 'Exitoso');
          this.getUsuario();
        } else if (result === 2) {
          this.openSnackBar('Se produjo un error al actualizar usuario', 'Error');
        }
      });
    }
  }

  delete(id: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id, module: 'usuario' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Usuario Eliminado', 'Exitoso');
        this.getUsuario();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al eliminar usuario', 'Error');
      }
    });
  }
}
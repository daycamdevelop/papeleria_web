import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { LineaElement } from '../../shared/model/LineaElement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LineaService } from '../../shared/services/linea.service';

@Component({
  selector: 'linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})
export class LineaComponent implements OnInit {

  public clientForm!: FormGroup;
  private lineaService = inject(LineaService);
  public listLineas:LineaElement[] = [];
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  ciudadesFiltradas: string[] = [];
  showDv:boolean = false;
  public loading = false;
  public lineaSeleccionada: LineaElement = {
    id: 0,
    nombre: '',
    estado: '',
    desvincular: '',
  };

  displayedColumns: string[] = ['id', 'nombre'];
  dataSource = new MatTableDataSource<LineaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading = true;
    this.getLineas();

    this.clientForm = new FormGroup({
      name: new FormControl(this.data?.name || '', Validators.required),
      estado: new FormControl(this.data?.estado || true),
    });

    this.limpiarCampos();
  }

  seleccionTabla(producto:LineaElement){
    this.lineaSeleccionada = producto;
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  insertarLinea(type:string): void {
    // Marca todos los campos como tocados
    this.clientForm.markAllAsTouched();
  
    // Verifica si el formulario es inválido
    if (this.clientForm.invalid) {
      // Mensaje de alerta general
      alert('Por favor, complete todos los campos obligatorios antes de guardar.');
      return;
    }
  
    let formData:LineaElement = {
      id: this.lineaSeleccionada.id,
      nombre: this.lineaSeleccionada.nombre,
      estado: this.lineaSeleccionada.estado,
      desvincular: 'NO',
    };
  
    if (type == "Nuevo") {
      // Actualizar linea existente
      this.lineaService.saveLinea(formData)
        .subscribe(
          () => {this.getLineas(); this.openSnackBar("Linea guardada", "Exitoso");}
        );
    } else {
      // Crear nueva linea
      this.lineaService.updateLinea(formData, formData.id)
      .subscribe(
        () => {this.getLineas(); this.openSnackBar("Linea actualizada", "Exitoso");}
      );
    }
  }

  getLineas(): void {
    this.lineaService.getLinea()
    .subscribe((data: any) => {
      const dataProducts: LineaElement[] = [];
      if (data.metadata[0].code == "200") {
        this.listLineas = data.lineaResponse.linea;
        this.llenarTabla(this.listLineas);
      }
      this.loading = false;
    }, (error: any) => {
      console.log("error: ", error);
    })
  }

  llenarTabla(dataClient:LineaElement[]){
    this.limpiarCampos();
    this.dataSource = new MatTableDataSource<LineaElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  limpiarCampos(){
    this.lineaSeleccionada = {
      id: 0,
      nombre: '',
      estado: '',
      desvincular: '',
    };
  }

  eliminarLinea(){
    this.lineaService.deleteLinea(this.lineaSeleccionada.id)
      .subscribe(
        () => {this.getLineas(); this.openSnackBar("Linea eliminada", "Exitoso");}
      );
  }

  onCancel(): void {
    this.dialogRef.close(3);
  }
}

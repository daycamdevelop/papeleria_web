import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BodegaService } from '../../shared/services/bodega.service';

@Component({
  selector: 'bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {

  public clientForm!: FormGroup;
  private bodegaService = inject(BodegaService);
  public listBodegas:BodegaElement[] = [];
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  ciudadesFiltradas: string[] = [];
  showDv:boolean = false;
  public loading = false;
  public bodegaSeleccionada: BodegaElement = {
    id: 0,
    nombre: '',
    contacto: '',
    telefono: '',
    direccion: '',
    estado: '',
    desvincular: '',
  };

  displayedColumns: string[] = ['id', 'nombre', 'contacto', 'telefono', 'direccion'];
  dataSource = new MatTableDataSource<BodegaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading = true;
    this.getBodegas();

    this.clientForm = new FormGroup({
      name: new FormControl(this.data?.name || '', Validators.required),
      complete_name: new FormControl(this.data?.name || '', Validators.required),
      address: new FormControl(this.data?.address || '', Validators.required),
      phone: new FormControl(this.data?.phone || '', [ Validators.required, Validators.pattern(/^\d+$/) ]),
      estado: new FormControl(this.data?.estado || true),
    });

    this.limpiarCampos();
  }

  seleccionTabla(producto:BodegaElement){
    this.bodegaSeleccionada = producto;
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  insertarBodega(type:string): void {
    // Marca todos los campos como tocados
    this.clientForm.markAllAsTouched();
  
    // Verifica si el formulario es inválido
    if (this.clientForm.invalid) {
      // Mensaje de alerta general
      alert('Por favor, complete todos los campos obligatorios antes de guardar.');
      return;
    }
  
    let formData:BodegaElement = {
      id: this.bodegaSeleccionada.id,
      nombre: this.bodegaSeleccionada.nombre,
      contacto: this.bodegaSeleccionada.contacto,
      telefono: this.bodegaSeleccionada.telefono,
      direccion: this.bodegaSeleccionada.direccion,
      estado: this.bodegaSeleccionada.estado,
      desvincular: 'NO',
    };
  
    if (type == "Nuevo") {
      // Actualizar bodega existente
      this.bodegaService.saveBodega(formData)
        .subscribe(
          () => {this.getBodegas(); this.openSnackBar("Bodega guardada", "Exitoso");}
        );
    } else {
      // Crear nueva bodega
      this.bodegaService.updateBodega(formData, formData.id)
      .subscribe(
        () => {this.getBodegas(); this.openSnackBar("Bodega actualizada", "Exitoso");}
      );
    }
  }

  getBodegas(): void {
    this.bodegaService.getBodega()
    .subscribe((data: any) => {
      const dataProducts: BodegaElement[] = [];
      if (data.metadata[0].code == "200") {
        this.listBodegas = data.bodegaResponse.bodega;
        this.llenarTabla(this.listBodegas);
      }
      this.loading = false;
    }, (error: any) => {
      console.log("error: ", error);
    })
  }

  llenarTabla(dataClient:BodegaElement[]){
    this.limpiarCampos();
    this.dataSource = new MatTableDataSource<BodegaElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  limpiarCampos(){
    this.bodegaSeleccionada = {
      id: 0,
      nombre: '',
      contacto: '',
      telefono: '',
      direccion: '',
      estado: '',
      desvincular: '',
    };
  }

  eliminarBodega(){
    this.bodegaService.deleteBodega(this.bodegaSeleccionada.id)
      .subscribe(
        () => {this.getBodegas(); this.openSnackBar("Bodega eliminada", "Exitoso");}
      );
  }

  onCancel(): void {
    this.dialogRef.close(3);
  }
}

import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/modules/shared/services/proveedor.service';
import { ProveedorElement } from '../../shared/model/ProveedorElement';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css']
})
export class NewProveedorComponent implements OnInit {

  public supplierForm!: FormGroup;
  private fb = inject(FormBuilder);
  private supplierService = inject(ProveedorService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";

  ngOnInit(): void {
    this.estadoFormulario = this.data ? 'Actualizar' : 'Agregar';

    // Inicializa el formulario reactivo con los nuevos campos
    this.supplierForm = this.fb.group({
      nombre: [this.data?.name || '', Validators.required],
      nit: [this.data?.nit || '', Validators.required],
      telefono: [
        this.data?.telefono || '', // Trae el valor de la base de datos
        [
          Validators.required,
          Validators.pattern(/^\d+$/) // Valida que sean solo números
        ]
      ],
      celular: [
        this.data?.celular || '', // Trae el valor de la base de datos
        [
          Validators.required,
          Validators.pattern(/^\d+$/) // Valida que sean solo números
        ]
      ],
      direccion: [this.data?.direccion || '', Validators.required],
      correo: [
        this.data?.correo || '',
        [
          Validators.required,
          Validators.email // Valida el formato de correo electrónico
        ]
      ],
      estado: [this.data?.estado || false],
    });
  }  

  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = /^[0-9]$/;
    if (!allowedKeys.test(event.key)) {
      event.preventDefault(); // Cancela el ingreso de caracteres no permitidos
    }
  }

  onSave(): void {
    // Marca todos los campos como tocados
    this.supplierForm.markAllAsTouched();
  
    // Verifica si el formulario es inválido
    if (this.supplierForm.invalid) {
      // Mensaje de alerta general
      alert('Por favor, complete todos los campos obligatorios antes de guardar.');
      return;
    }
  
    let formData:ProveedorElement = {
      nombre: this.supplierForm.get('nombre')?.value,
      nit: this.supplierForm.get('nit')?.value,
      direccion: this.supplierForm.get('direccion')?.value,
      telefono: this.supplierForm.get('telefono')?.value,
      celular: this.supplierForm.get('celular')?.value,
      correo: this.supplierForm.get('correo')?.value,
      estado: this.supplierForm.get('estado')?.value ? 'activo' : 'inactivo',
      desvincular: 'NO'
    };
  
    if (this.data) {
      // Actualizar supplier existente
      this.supplierService.updateProveedor(formData, this.data.id)
        .subscribe(
          () => this.dialogRef.close(1),
          () => this.dialogRef.close(2)
        );
    } else {
      // Crear nuevo supplier
      this.supplierService.saveProveedor(formData)
        .subscribe(
          () => this.dialogRef.close(1),
          () => this.dialogRef.close(2)
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close(3);
  }
}

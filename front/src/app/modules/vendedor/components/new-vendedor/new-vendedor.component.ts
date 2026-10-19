import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendedorElement } from 'src/app/modules/shared/model/VendedorElement';
import { VendedorService } from 'src/app/modules/shared/services/vendedor.service';

@Component({
  selector: 'app-new-vendedor',
  templateUrl: './new-vendedor.component.html',
  styleUrls: ['./new-vendedor.component.css']
})
export class NewVendedorComponent implements OnInit {

  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private vendedorService = inject(VendedorService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";

  ngOnInit(): void {
    this.estadoFormulario = this.data ? 'Actualizar' : 'Agregar';

    // Inicializa el formulario reactivo con los nuevos campos
    this.categoryForm = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
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
    this.categoryForm.markAllAsTouched();
  
    // Verifica si el formulario es inválido
    if (this.categoryForm.invalid) {
      // Mensaje de alerta general
      alert('Por favor, complete todos los campos obligatorios antes de guardar.');
      return;
    }

    let formData:VendedorElement = {
      nombre: this.categoryForm.get('nombre')?.value,
      nit: this.categoryForm.get('nit')?.value,
      direccion: this.categoryForm.get('direccion')?.value,
      telefono: this.categoryForm.get('telefono')?.value,
      celular: this.categoryForm.get('celular')?.value,
      correo: this.categoryForm.get('correo')?.value,
      estado: this.categoryForm.get('estado')?.value ? 'activo' : 'inactivo',
      desvincular: 'NO'
    };
  
    if (this.data) {
      // Actualizar category existente
      this.vendedorService.updateVendedor(formData, this.data.id)
        .subscribe(
          () => this.dialogRef.close(1),
          () => this.dialogRef.close(2)
        );
    } else {
      // Crear nuevo category
      this.vendedorService.saveVendedor(formData)
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

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/modules/shared/services/usuario.service';
import { UsuarioElement } from '../../shared/model/UsuarioElement';
import { departamentos, mapdepartamentos, mapTiposIdentificacion, mapTiposIdentificacionId, mapTiposIdentificacionNombre, tiposIdentificacion } from '../../shared/util/options';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css']
})
export class NewUsuarioComponent implements OnInit {

  public clientForm!: FormGroup;
  private fb = inject(FormBuilder);
  private clientService = inject(UsuarioService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";
  ciudadesFiltradas: string[] = [];

  // Lista de tipos de documento
  tiposIdentificacion: string[] = tiposIdentificacion;

  // Lista de departamentos y ciudades
  departamentos = departamentos;

  ngOnInit(): void {
    this.estadoFormulario = this.data ? 'Actualizar' : 'Agregar';

    // Inicializa el formulario reactivo con los nuevos campos
    this.clientForm = this.fb.group({
      nombres: [this.data?.nombres || '', Validators.required],
      apellidos: [this.data?.apellidos || '', Validators.required],
      numero_documento: [this.data?.numero_documento || '', Validators.required],
      tipo_documento: [mapTiposIdentificacion(mapTiposIdentificacionNombre(this.data?.tipo_documento)) || '', Validators.required],
      usuarionombre: [this.data?.usuarionombre || null],
      pass: [this.data?.pass || null],
      estado: [this.data?.estado || true],
    });

    // Inicializa las ciudades filtradas si es una edición
    if (this.data?.departamento) {
      const selected = this.departamentos.find(d => d.nombre === mapdepartamentos(this.data.departamento));
      this.ciudadesFiltradas = selected ? selected.ciudades : [];
    }

    // Asegúrate de que el valor de ciudad es válido
    if (this.data?.ciudad && !this.ciudadesFiltradas.includes(this.data.ciudad)) {
      this.clientForm.get('ciudad')?.setValue(''); // Reinicia la ciudad si no es válida
    }
  }

  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = /^[0-9]$/;
    if (!allowedKeys.test(event.key)) {
      event.preventDefault(); // Cancela el ingreso de caracteres no permitidos
    }
  }

  onSave(): void {
    // Marca todos los campos como tocados
    this.clientForm.markAllAsTouched();
  
    // Verifica si el formulario es inválido
    if (this.clientForm.invalid) {
      // Mensaje de alerta general
      alert('Por favor, complete todos los campos obligatorios antes de guardar.');
      return;
    }
  
    let formData:UsuarioElement = {
      nombres: this.clientForm.get('nombres')?.value,
      apellidos: this.clientForm.get('apellidos')?.value,
      tipo_documento: mapTiposIdentificacionId(mapTiposIdentificacion(this.clientForm.get('tipo_documento')?.value)),
      numero_documento: this.clientForm.get('numero_documento')?.value,
      usuarionombre: this.clientForm.get('usuarionombre')?.value,
      pass: this.clientForm.get('pass')?.value,
      estado: this.clientForm.get('estado')?.value ? 'activo' : 'inactivo',
      rol: 2,
      desvincular: 'NO'
    };
  
    if (this.data) {
      // Actualizar proveedor existente
      this.clientService.updateUsuario(formData, this.data.id)
        .subscribe(
          () => this.dialogRef.close(1),
          () => this.dialogRef.close(2)
        );
    } else {
      // Crear nuevo proveedor
      this.clientService.saveUsuario(formData)
      .subscribe(
        () => this.dialogRef.close(1),
        () => this.dialogRef.close(2)
      );
    }
  }

  // Método para manejar el cambio de departamento
  onDepartmentChange(departamento: string): void {
    const selected = this.departamentos.find(d => d.nombre === departamento);
    this.ciudadesFiltradas = selected ? selected.ciudades : [];
    this.clientForm.get('ciudad')?.setValue(''); // Reinicia el campo de ciudad
  }

  onCancel(): void {
    this.dialogRef.close(3);
  }
}

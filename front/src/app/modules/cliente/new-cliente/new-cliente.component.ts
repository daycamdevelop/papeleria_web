import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';
import { ClientElement } from '../../shared/model/ClienteElement';
import { formatoFecha } from '../../shared/util/util';
import { departamentos, mapdepartamentos, mapTiposIdentificacion, tiposIdentificacion } from '../../shared/util/options';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit {

  public clientForm!: FormGroup;
  private fb = inject(FormBuilder);
  private clientService = inject(ClienteService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";
  ciudadesFiltradas: string[] = [];
  showDv:boolean = false;

  // Lista de tipos de documento
  tiposIdentificacion: string[] = tiposIdentificacion;

  // Lista de departamentos y ciudades
  departamentos = departamentos;

  ngOnInit(): void {
    this.estadoFormulario = this.data ? 'Actualizar' : 'Agregar';

    // Inicializa el formulario reactivo con los nuevos campos
    this.clientForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      document: [this.data?.document || '', Validators.required],
      t_document: [mapTiposIdentificacion(this.data?.t_document) || '', Validators.required],
      dv: [this.data?.dv || '99', Validators.required],
      phone: [
        this.data?.phone || '', // Trae el valor de la base de datos
        [
          Validators.required,
          Validators.pattern(/^\d+$/) // Valida que sean solo números
        ]
      ],
      address: [this.data?.address || '', Validators.required],
      email: [
        this.data?.email || '',
        [
          Validators.required,
          Validators.email // Valida el formato de correo electrónico
        ]
      ],
      departamento: [mapdepartamentos(this.data?.departamento) || '', Validators.required],
      ciudad: [this.data?.ciudad || '', Validators.required],
      valor_credito: [this.data?.valor_credito || null],
      fecha_credito: [this.data?.fecha_credito || null],
      estado: [this.data?.estado || true],
    });

    // Observa los cambios del tipo de documento
    this.clientForm.get('t_document')?.valueChanges.subscribe((value) => {
      this.toggleDvValidator(value);
    });

    // Aplica una validación inicial
    this.toggleDvValidator(this.data?.t_document);

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

  private toggleDvValidator(tipoDoc: string) {
    const dvControl = this.clientForm.get('dv');
    if (tipoDoc && tipoDoc.includes('NIT')) {
      this.showDv = true;
      dvControl?.setValidators([Validators.required]);
    } else {
      this.showDv = false;
      dvControl?.clearValidators();
      dvControl?.setValue('99'); // limpia el campo si no aplica
    }
    dvControl?.updateValueAndValidity();
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
  
    let formData:ClientElement = {
      nombre: this.clientForm.get('name')?.value,
      t_documento: this.clientForm.get('t_document')?.value,
      nit: this.clientForm.get('document')?.value,
      direccion: this.clientForm.get('address')?.value,
      telefono: this.clientForm.get('phone')?.value,
      ciudad: null,
      correo: this.clientForm.get('email')?.value,
      estado: this.clientForm.get('estado')?.value ? 'activo' : 'inactivo',
      desvincular: 'NO',
      valor_credito: this.clientForm.get('valor_credito')?.value,
      fecha_credito: formatoFecha(this.clientForm.get('fecha_credito')?.value),
      remitente: null,
      cedularemitente: null,
      telefonoremitente: null,
      tipo: '13',
      ciudaddane: '11001',
      dv: '99',
      tipopersona: '2',
      tipoiva: '49'
    };
  
    if (this.data) {
      // Actualizar proveedor existente
      this.clientService.updateCliente(formData, this.data.id)
        .subscribe(
          () => this.dialogRef.close(1),
          () => this.dialogRef.close(2)
        );
    } else {
      // Crear nuevo proveedor
      this.clientService.saveCliente(formData)
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

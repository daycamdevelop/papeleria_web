import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAyudaDialog } from '../../pages/modalAyuda/modal-ayuda.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = 'Usuario';
  animal = "Animal";
  name = "Nombre";
  dialog = inject(MatDialog);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí podrías cargar dinámicamente el nombre del usuario desde un servicio.
    this.userName = 'Juan Pérez'; // Ejemplo estático.
  }

  navigateTo(route: string): void {
    // Aseguramos que las rutas comiencen con 'dashboard'
    this.router.navigate([`/dashboard/${route}`]);
  }

  abrirAyuda(): void {
    const dialogRef = this.dialog.open(ModalAyudaDialog, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal = result;
      }
    });
  }
}

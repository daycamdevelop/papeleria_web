import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = 'Usuario';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí podrías cargar dinámicamente el nombre del usuario desde un servicio.
    this.userName = 'Juan Pérez'; // Ejemplo estático.
  }

  navigateTo(route: string): void {
    // Aseguramos que las rutas comiencen con 'dashboard'
    this.router.navigate([`/dashboard/${route}`]);
  }
}

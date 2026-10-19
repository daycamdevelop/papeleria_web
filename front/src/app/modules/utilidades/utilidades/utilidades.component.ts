import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { UtilidadesService } from '../../shared/services/utilidades.service';
import { Subject } from 'rxjs';
import { UtilidadesElement } from '../../shared/model/UtilidadesElement';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styleUrls: ['./utilidades.component.css']
})
export class UtilidadesComponent {
  constructor(private router: Router) { }

  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();

  ngOnInit(): void {
    
  }

  navigateTo(route: string): void {
    // Aseguramos que las rutas comiencen con 'dashboard'
    this.router.navigate([`/dashboard/utilidades/${route}`]);
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }
}
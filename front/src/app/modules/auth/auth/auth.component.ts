import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private router: Router) { }

  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  
  password:string="";
  
  ngOnInit(): void {
    //this.loading = true;
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  validar() {
    if (this.password === "Roman@day") {
        localStorage.setItem('Validate', 'true');
        this.router.navigate(['/dashboard/home']);
        this.openSnackBar('Computador configurado', 'Exitoso');
      } else {
        this.openSnackBar('No se pudo registrar el computador', 'Error');
      }
  }

  eliminar() {
    localStorage.removeItem('Validate');
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}
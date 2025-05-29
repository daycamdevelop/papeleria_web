import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ModalLicenciaDialog } from '../modalLicencia/modal-licencia.component';

@Component({
  standalone: true,
  selector: 'app-modal-ayuda',
  templateUrl: 'modal-ayuda.component.html',
  styleUrls: ['./modal-ayuda.component.css'],
  imports: [MatDialogModule],
})
export class ModalAyudaDialog {
  data = inject(MAT_DIALOG_DATA);
  version = environment.version;
  dialog = inject(MatDialog);

  descargarAPK(){

  }

  verLicencia(){
    const dialogRef = this.dialog.open(ModalLicenciaDialog);

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      console.log('The dialog was closed');
    });
  }
}

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-modal-licencia',
  templateUrl: 'modal-licencia.component.html',
  styleUrls: ['./modal-licencia.component.css'],
  imports: [MatDialogModule],
})
export class ModalLicenciaDialog {
  data = inject(MAT_DIALOG_DATA);
  version = environment.version;
}

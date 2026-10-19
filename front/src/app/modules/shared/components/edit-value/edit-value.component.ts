import { Component, ElementRef, inject, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatoEnteroAPrecio, formatoPrecioAEntero } from '../../util/util';

@Component({
  selector: 'app-edit-value',
  templateUrl: './edit-value.component.html',
  styleUrls: ['./edit-value.component.css']
})
export class EditValueComponent implements AfterViewInit  {
  
  @ViewChild('MyInput') MyInput!: ElementRef<HTMLInputElement>;

  private dialogRef = inject(MatDialogRef<EditValueComponent>);
  private cd = inject(ChangeDetectorRef);
  public data = inject(MAT_DIALOG_DATA);
  public valor: string = "0";

  ngOnInit(): void {
    this.valor = this.data.valor;
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.MyInput.nativeElement.focus();
    }, 400);
    setTimeout(() => {
      this.formatearPrecio();
    }, 300);
  }

  formatearPrecio() {
    this.valor = formatoEnteroAPrecio(this.valor+"", this.data.tipo == 2);
  }

  onNoClick(){
    this.dialogRef.close(this.data.valor);
  }

  onClick(){
    if (this.data.valor != null){
      this.dialogRef.close(formatoPrecioAEntero(this.valor));
    } else {
      this.dialogRef.close(formatoPrecioAEntero(this.data.valor));
    }
  }
}

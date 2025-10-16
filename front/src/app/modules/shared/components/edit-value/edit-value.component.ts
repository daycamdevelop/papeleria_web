import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-value',
  templateUrl: './edit-value.component.html',
  styleUrls: ['./edit-value.component.css']
})
export class EditValueComponent implements OnInit {
  
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public valor:number = 0;

  ngOnInit(): void {
    this.valor = this.data;
  }

  onNoClick(){
    this.dialogRef.close(this.data);
  }

  delete(){
    if (this.data != null){
      this.dialogRef.close(this.valor);
    } else {
      this.dialogRef.close(this.data);
    }
  }
}

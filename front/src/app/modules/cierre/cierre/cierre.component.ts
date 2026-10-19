import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { CierreService } from '../../shared/services/cierre.service';
import { PdfService } from '../../shared/services/pdf.service';
import { CierreElement, CreditosElement, IngresosyEgresosElement } from '../../shared/model/CierreElement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { formatoFechaSinHora } from '../../shared/util/util';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.css']
})
export class CierreComponent {
  constructor(private router: Router, private pdfService:PdfService) { }

  private cierreService = inject(CierreService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  public cierreSeleccionado = {
    concepto: '',
    tipo: 1,
    valor: 0,
    fechaInicio: new Date(),
    fechaFin: new Date()
  };

  ngOnInit(): void {/*
    this.loading = true;
    this.getCierre();*/
  }

  displayedColumnsIngresos: string[] = ['concepto', 'es', 'valor', 'fecha registro'];
  dataSourceIngresos = new MatTableDataSource<IngresosyEgresosElement>();

  displayedColumnsCreditos: string[] = ['# factura', 'fecha factura', 'nombres', 'valor facturado', 'abono', 'forma pago', 'saldo factura', 'codigo credito', 'observacion'];
  dataSourceCreditos = new MatTableDataSource<IngresosyEgresosElement>();

  llenarTablaIngresos(dataClient:IngresosyEgresosElement[]){
    this.dataSourceIngresos = new MatTableDataSource<IngresosyEgresosElement>(dataClient);
    this.dataSourceIngresos.paginator = this.paginator;
  }

  llenarTablaCreditos(dataClient:CreditosElement[]){
    this.dataSourceCreditos = new MatTableDataSource<CreditosElement>(dataClient);
    this.dataSourceCreditos.paginator = this.paginator;
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  route(route:string): void {
    this.router.navigate(['/dashboard/'+route]);
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  getCierre(): void {
    if(this.cierreSeleccionado.fechaInicio && this.cierreSeleccionado.fechaFin){
      this.cierreService.getCierre(formatoFechaSinHora(new Date(this.cierreSeleccionado.fechaInicio)), formatoFechaSinHora(new Date(this.cierreSeleccionado.fechaFin)))
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          data.cierreResponse.cierre.tirilla = "1";
          this.pdfService.generarPDF({
            type: "Cierre",
            body: data.cierreResponse.cierre
          });
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
    } else {
      this.openSnackBar("Seleccione rango de fechas", "Error");
    }
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }
}
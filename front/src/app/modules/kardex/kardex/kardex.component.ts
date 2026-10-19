import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';
import { formatoFechaSinHora } from '../../shared/util/util';
import { exportExcel } from '../../shared/util/excel';
import { KardexElement, KardexTablaElement } from '../../shared/model/KardexElement';
import { KardexService } from '../../shared/services/kardex.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent {
  constructor(private router: Router) { }

  private kardexService = inject(KardexService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:KardexTablaElement[] = [];
  public kardexSeleccionado: KardexElement = {
    codigoproducto: '',
    nombreproducto: '',
    fecha: '',
    item: 0,
    entradas: 0,
    salidas: 0,
    cantidadfinal: 0
  };

  bodegas: any[] = [];
  lineas: any[] = [];

  ngOnInit(): void {
    
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['fecha', 'tipo', 'numerofactura', 'cantidad', 'entradas', 'salidas', 'saldo', 'usuarioSel'];
  dataSource = new MatTableDataSource<KardexTablaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  getKardex(): void {
    this.loading = true;
    this.kardexService.getKardex(this.kardexSeleccionado.codigoproducto, formatoFechaSinHora(new Date(this.kardexSeleccionado.fecha)))
      .subscribe((data: any) => {
        const dataProducts: KardexTablaElement[] = [];
        if (data.metadata[0].code == "200") {
          this.listProductos = data.kardexResponse.kardex;
          this.listProductos.forEach((element: KardexTablaElement) => {
            dataProducts.push(element);
          });
          this.llenarTabla(dataProducts);
        }
      }, (error: any) => {
        console.log("error: ", error);
      })
      this.loading = false;
  }

  llenarTabla(dataClient:KardexTablaElement[]){
    this.dataSource = new MatTableDataSource<KardexTablaElement>(dataClient);
    this.dataSource.paginator = this.paginator;
    this.calcularValores(dataClient);
  }

  calcularValores(dataClient:KardexTablaElement[]){
    let entradas = 0;
    let salidas = 0;
    let saldototal = 0;
    dataClient.forEach((element: KardexTablaElement, i) => {
      entradas += element.entradas;
      salidas += element.salidas;
      if(i != 0){
        element.cantidad = saldototal;
        saldototal += element.entradas - element.salidas;
      } else {
        saldototal += element.cantidad;
      }
      element.saldo = saldototal;
    });
    this.kardexSeleccionado.item = dataClient.length;
    this.kardexSeleccionado.entradas = entradas;
    this.kardexSeleccionado.salidas = salidas;
    this.kardexSeleccionado.cantidadfinal = saldototal;
  }

  exportExcel(){
    exportExcel(this.listProductos, "Kardex");
  }
}
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { LineaService } from '../../shared/services/linea.service';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';
import { InventarioElement, InventarioTablaElement } from '../../shared/model/InventarioElement';
import { InventarioService } from '../../shared/services/inventario.service';
import { formatoEnteroAPrecio } from '../../shared/util/util';
import { exportExcel } from '../../shared/util/excel';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  constructor(private router: Router) { }

  private inventarioService = inject(InventarioService);
  private bodegaService = inject(BodegaService);
  private lineaService = inject(LineaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:InventarioTablaElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listLineas:LineaElement[] = [];
  public listFilterProducts:InventarioTablaElement[] = [];
  public inventarioSeleccionado: InventarioElement = {
    codigoproducto: '',
    nombreproducto: '',
    linea: 2,
    bodega: 1,
    cantidaditems: '',
    cantidadunidades: '',
    costocompratotal: '',
    costoventatotal: ''
  };

  bodegas: any[] = [];
  lineas: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getBodegas();
    this.getLineas();
    this.getInventario();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['bodega', 'codigo', 'producto', 'linea', 'cantidad', 'costo', 'precio', 'costoventa', 'costoventatotal', 'costoventa2', 'costoventa3', 'iva', 'tipoiva', 'serial'];
  dataSource = new MatTableDataSource<InventarioTablaElement>();

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

  getInventario(): void {
    this.inventarioService.getInventario(this.inventarioSeleccionado.bodega, this.inventarioSeleccionado.linea)
      .subscribe((data: any) => {
        const dataProducts: InventarioTablaElement[] = [];
        if (data.metadata[0].code == "200") {
          this.listProductos = data.inventarioResponse.inventario;
          this.listProductos.forEach((element: InventarioTablaElement) => {
            dataProducts.push(element);
          });
          this.searchProduct(true);
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getBodegas(): void {
    this.bodegaService.getBodega()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listBodegas = data.bodegaResponse.bodega;
          this.listBodegas.forEach((element: BodegaElement) => {
            this.bodegas.push({value: element.id, viewValue: element.nombre});
          });
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getLineas(): void {
    this.lineaService.getLinea()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listLineas = data.lineaResponse.linea;
          this.listLineas.forEach((element: LineaElement) => {
            this.lineas.push({value: element.id, viewValue: element.nombre});
          });
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  llenarTabla(dataClient:InventarioTablaElement[]){
    this.calcularValores(dataClient);
    this.dataSource = new MatTableDataSource<InventarioTablaElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  searchProduct(busquedaCodigo:boolean){
    this.listFilterProducts = [];
    this.listProductos.forEach((element: InventarioTablaElement) => {
      if(busquedaCodigo && element.codigo.includes(this.inventarioSeleccionado.codigoproducto)){
        this.listFilterProducts.push(element);
      } else if(!busquedaCodigo && element.producto.includes(this.inventarioSeleccionado.nombreproducto)){
        this.listFilterProducts.push(element);
      }
    });
    this.llenarTabla(this.listFilterProducts);
  }

  seleccionTabla(producto:InventarioElement){
    this.inventarioSeleccionado = producto;
  }

  quitarSeleccion(){
    this.inventarioSeleccionado = {
      codigoproducto: '',
      nombreproducto: '',
      linea: 2,
      bodega: 1,
      cantidaditems: '',
      cantidadunidades: '',
      costocompratotal: '',
      costoventatotal: ''
    };
    this.searchProduct(true);
  }

  calcularValores(dataClient:InventarioTablaElement[]){
    let cantidadunidades = 0;
    let costocompratotal = 0;
    let costoventatotal = 0;
    dataClient.forEach((element: InventarioTablaElement) => {
      cantidadunidades += element.cantidad;
      costocompratotal += element.precio;
      costoventatotal += element.costoventatotal;
    });
    this.inventarioSeleccionado.cantidaditems = formatoEnteroAPrecio(dataClient.length+"", false);
    this.inventarioSeleccionado.cantidadunidades = formatoEnteroAPrecio(cantidadunidades+"", false);
    this.inventarioSeleccionado.costocompratotal = formatoEnteroAPrecio(costocompratotal+"", true);
    this.inventarioSeleccionado.costoventatotal = formatoEnteroAPrecio(costoventatotal+"", true);
  }

  exportExcel(){
    exportExcel(this.listFilterProducts, "Inventario");
  }
}
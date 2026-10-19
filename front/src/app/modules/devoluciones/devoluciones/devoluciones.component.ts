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
import { DevolucionElement } from '../../shared/model/DevolucionElement';
import { FacturaDevolucionElement, FacturaDevolucionTablaElement } from '../../shared/model/FacturaElement';
import { FacturaService } from '../../shared/services/factura.service';
import { ClienteService } from '../../shared/services/cliente.service';
import { ClientElement } from '../../shared/model/ClienteElement';
import { DevolucionFacturaComponent } from '../devolucion-factura/devolucion-factura.component';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent {
  constructor(private router: Router) { }

  private facturaService = inject(FacturaService);
  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:FacturaDevolucionElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listLineas:LineaElement[] = [];
  public listFilterProducts:FacturaDevolucionElement[] = [];
  public listClient:ClientElement[] = [];
  public devolucionSeleccionado: DevolucionElement = {
    numfactura: '',
    cliente: ''
  };

  bodegas: any[] = [];
  lineas: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getClient();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['numfactura', 'cliente', 'fechafactura', 'estado', 'subtotal'];
  dataSource = new MatTableDataSource<FacturaDevolucionElement>();

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

  getFacturas(): void {
    this.facturaService.getFactura()
      .subscribe((data: any) => {
        const dataProducts: FacturaDevolucionElement[] = [];
        if (data.metadata[0].code == "200") {
          this.listProductos = data.facturaResponse.factura;
          this.listProductos.forEach((element: FacturaDevolucionElement) => {
            dataProducts.push(element);
          });
          this.searchProduct();
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getClient(): void {
    this.clienteService.getCliente().subscribe(
      (data: any) => {
        this.loading = false;
        this.processClientResponse(data);
        this.getFacturas();
      },
      (error: any) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  processClientResponse(resp: any): void {
      const dataClient: ClientElement[] = [];
      if (resp.metadata[0].code === '200') {
        this.listClient = resp.clienteResponse.cliente;
        this.listClient.forEach((element: ClientElement) => {
          dataClient.push(element);
        });
      }
    }

  llenarTabla(dataClient:FacturaDevolucionElement[]){
    this.calcularValores(dataClient);
    this.dataSource = new MatTableDataSource<FacturaDevolucionElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  searchProduct(){
    this.listFilterProducts = [];
    this.listProductos.forEach((element: FacturaDevolucionElement) => {
      if((this.devolucionSeleccionado.numfactura == '' && this.devolucionSeleccionado.cliente == '') || element.numfactura == this.devolucionSeleccionado.numfactura || element.cliente == this.devolucionSeleccionado.cliente){
        this.listFilterProducts.push(element);
      }
    });
    const mapaUnicos = new Map();

    this.listFilterProducts.forEach(item => {
      if (!mapaUnicos.has(item.numfactura)) {
        mapaUnicos.set(item.numfactura, item); // Guarda el primer objeto encontrado
      }
    });

    // Convertimos los valores del Map de nuevo a un array
    this.listFilterProducts = Array.from(mapaUnicos.values());
    this.llenarTabla(this.listFilterProducts);
  }

  seleccionTabla(producto:FacturaDevolucionTablaElement){
    this.devolucionSeleccionado = producto;
  }

  quitarSeleccion(){
    this.devolucionSeleccionado = {
      numfactura: '',
      cliente: ''
    };
    this.searchProduct();
  }

  calcularValores(dataClient:FacturaDevolucionElement[]){
    dataClient.forEach((element: FacturaDevolucionElement) => {
      element.subtotal = formatoEnteroAPrecio(element.subtotal+"", true);
      let cliente = this.listClient.find((cli)=> cli.id+"" == element.cliente);
      element.cliente = cliente?cliente.nombre:'No encontrado'; 
    });
  }

  limpiarTabla(){
    this.listFilterProducts = [];
    this.llenarTabla(this.listFilterProducts);
  }

  exportExcel(){
    exportExcel(this.listFilterProducts, "Devolucion");
  }

  openClientDialog(): void {
    const dialogRef = this.dialog.open(DevolucionFacturaComponent, {
      width: '100%',
      height: '70%',
      data: { 
        prods: this.listProductos.filter((fac)=>fac.numfactura == this.devolucionSeleccionado.numfactura)
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Devolucion Agregada', 'Exitoso');
        this.getClient();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al guardar la devolucion', 'Error');
      }
    });
  }
}
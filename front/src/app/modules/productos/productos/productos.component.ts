import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../shared/services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { LineaService } from '../../shared/services/linea.service';
import { ProductosElement } from '../../shared/model/ProductosElement';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  constructor(private router: Router) { }

  private productoService = inject(ProductoService);
  private bodegaService = inject(BodegaService);
  private lineaService = inject(LineaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:ProductosElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listLineas:LineaElement[] = [];
  public listFilterProducts:any;
  public productoSeleccionado: ProductosElement = {
    id: 0,
    codigo: '',
    nombre: '',
    cantidad: 0,
    fecharegistro: '',
    linea: 2,
    bodega: 1,
    estado: '',
    desvincular: 'NO',
    costo: 0,
    costoventa: 0,
    serial: '',
    costoventa2: 0,
    costoventa3: 0,
    iva: 0,
    observacion: '',
    registro: '',
    registro2: ''
  };

  bodegas: any[] = [];
  lineas: any[] = [];

  estados: any[] = [
    {value: 'activo', viewValue: 'activo'},
    {value: 'inactivo', viewValue: 'inactivo'}
  ];

  ngOnInit(): void {
    this.loading = true;
    this.getBodegas();
    this.getLineas();
    this.getProductos();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'costo', 'costoventa', 'fecharegistro', 'estado', 'id', 'serial', 'costoventa2', 'costoventa3', 'iva', 'desvincular'];
  dataSource = new MatTableDataSource<ProductosElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  insert() {
    this.productoService.saveProduct(this.productoSeleccionado).subscribe((result: any) => {
      this.openSnackBar("Producto Agregado", "Exitoso");
      this.getProductos();
    })
  }

  edit() {
    this.productoService.updateProduct(this.productoSeleccionado, this.productoSeleccionado.id).subscribe((result: any) => {
      this.openSnackBar("Producto Actualizado", "Exitoso");
      this.getProductos();
    })
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: this.productoSeleccionado.id, module: "product" }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto Eliminado", "Exitoso");
        this.getProductos();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar producto", "Error");
      }
    });
  }

  getProductos(): void {
    this.productoService.getProduct()
      .subscribe((data: any) => {
        const dataProducts: ProductosElement[] = [];
        if (data.metadata[0].code == "200") {
          this.listProductos = data.productoResponse.producto;
          this.listProductos.forEach((element: ProductosElement) => {
            dataProducts.push(element);
          });
          this.llenarTabla(dataProducts);
          this.searchProduct();
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getBodegas(): void {
    this.bodegaService.getBodega()
      .subscribe((data: any) => {
        const dataProducts: BodegaElement[] = [];
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
        const dataProducts: LineaElement[] = [];
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

  llenarTabla(dataClient:ProductosElement[]){
    this.dataSource = new MatTableDataSource<ProductosElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  searchProduct(){
    this.listFilterProducts = [];
    this.listProductos.forEach((element: ProductosElement) => {
      if(this.productoSeleccionado.codigo == "*" || this.productoSeleccionado.codigo == ""){
        this.listFilterProducts.push(element);
      } else if(element.codigo.includes(this.productoSeleccionado.codigo)){
        this.listFilterProducts.push(element);
      }
    });
    this.llenarTabla(this.listFilterProducts);
  }

  seleccionTabla(producto:ProductosElement){
    this.productoSeleccionado = producto;
  }

  quitarSeleccion(){
    this.productoSeleccionado = {
      id: 0,
      codigo: '',
      nombre: '',
      cantidad: 0,
      fecharegistro: '',
      linea: 0,
      bodega: 0,
      estado: '',
      desvincular: 'NO',
      costo: 0,
      costoventa: 0,
      serial: '',
      costoventa2: 0,
      costoventa3: 0,
      iva: 0,
      observacion: '',
      registro: '',
      registro2: ''
    };
    this.searchProduct();
  }
}
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewProveedorComponent } from '../../proveedor/new-proveedor/new-proveedor.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  constructor(private router: Router) { }

  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProducts:any;
  public listFilterProducts:any;
  public productoSeleccionado: ProductosElement = {
    id: 0,
    codigo: '',
    nombre: '',
    cantidad: '',
    fecharegistro: '',
    linea: 2,
    bodega: 1,
    estado: '',
    desvincular: '',
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

  bodegas: any[] = [
    {value: 1, viewValue: 'principal'}
  ];

  lineas: any[] = [
    {value: 2, viewValue: 'varios'}
  ];

  estados: any[] = [
    {value: 'activo', viewValue: 'activo'},
    {value: 'inactivo', viewValue: 'inactivo'}
  ];

  ngOnInit(): void {
    this.loading = true;
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
    this.productService.saveProduct(this.productoSeleccionado).subscribe((result: any) => {
      this.openSnackBar("Producto Agregado", "Exitoso");
      this.getProductos();
    })
  }

  edit() {
    this.productService.updateProduct(this.productoSeleccionado, this.productoSeleccionado.id).subscribe((result: any) => {
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
    this.productService.getProduct()
      .subscribe((data: any) => {
        this.processProductResponse(data);
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processProductResponse(resp: any) {
    const dataProducts: ProductosElement[] = [];
    if (resp.metadata[0].code == "200") {
      this.listProducts = resp.productoResponse.producto;
      this.listProducts.forEach((element: ProductosElement) => {
        dataProducts.push(element);
      });
      this.llenarTabla(dataProducts);
      this.searchProduct();
    }
  }

  llenarTabla(dataClient:ProductosElement[]){
    this.dataSource = new MatTableDataSource<ProductosElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  searchProduct(){
    this.listFilterProducts = [];
    this.listProducts.forEach((element: ProductosElement) => {
      if(this.productoSeleccionado.codigo == "*" || this.productoSeleccionado.codigo == ""){
        this.listFilterProducts.push(element);
      } else if(element.codigo.toLocaleLowerCase() == this.productoSeleccionado.codigo.toLocaleLowerCase()){
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
      cantidad: '',
      fecharegistro: '',
      linea: 0,
      bodega: 0,
      estado: '',
      desvincular: '',
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

export interface ProductosElement {
  id: number;
  codigo: string;
	nombre: string;
	cantidad: string;
	fecharegistro: string;
	linea: number;
	bodega: number;
	estado: string;
	desvincular: string;
	costo: number;
	costoventa: number;
	serial: string;
	costoventa2: number;
	costoventa3: number;
	iva: number;
	observacion: string;
	registro: string;
	registro2: string;
}
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CompraService } from '../../shared/services/compra.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { LineaService } from '../../shared/services/linea.service';
import { ComprasElement } from '../../shared/model/ComprasElement';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';
import { ProductosElement } from '../../shared/model/ProductosElement';
import { ProductoService } from '../../shared/services/producto.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  constructor(private router: Router) { }

  private productoService = inject(ProductoService);
  private Compraservice = inject(CompraService);
  private bodegaService = inject(BodegaService);
  private lineaService = inject(LineaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:ComprasElement[] = [];
  public listCompras:ComprasElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listLineas:LineaElement[] = [];
  public listFilterProducts:any;
  public compraseleccionadas: ComprasModel[] = [];
  public codigoseleccionado:string = "codigo";
  public productoSeleccionado:ProductosElement = {
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
  }

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
    this.getCompras();
    this.getProductos();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'costo', 'costoventa', 'fecharegistro', 'estado', 'id', 'serial', 'costoventa2', 'costoventa3', 'iva', 'desvincular'];
  dataSource = new MatTableDataSource<ComprasElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  insert() {
    this.Compraservice.saveProduct(this.compraseleccionadas).subscribe((result: any) => {
      this.openSnackBar("compra Agregado", "Exitoso");
      this.getCompras();
    })
  }

  edit() {/*
    this.Compraservice.updateProduct(this.compraseleccionadas, this.compraseleccionadas.id).subscribe((result: any) => {
      this.openSnackBar("compra Actualizado", "Exitoso");
      this.getCompras();
    })*/
  }

  delete() {/*
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: this.compraseleccionadas.id, module: "product" }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("compra Eliminado", "Exitoso");
        this.getCompras();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar compra", "Error");
      }
    });*/
  }

  getCompras(): void {
    this.Compraservice.getProduct()
      .subscribe((data: any) => {
        const dataProducts: ComprasElement[] = [];
        if (data.metadata[0].code == "200") {
          this.listCompras = data.compraResponse.compra;
          this.listCompras.forEach((element: ComprasElement) => {
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

  getProductos(): void {
      this.productoService.getProduct()
        .subscribe((data: any) => {
          const dataProducts: ComprasElement[] = [];
          if (data.metadata[0].code == "200") {
            this.listProductos = data.productoResponse.producto;
            this.listProductos.forEach((element: ComprasElement) => {
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

  llenarTabla(dataClient:ComprasElement[]){
    this.dataSource = new MatTableDataSource<ComprasElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  searchProduct(){/*
    this.listFilterProducts = [];
    this.listCompras.forEach((element: ComprasElement) => {
      if(this.compraseleccionadas.codigo == "*" || this.compraseleccionadas.codigo == ""){
        this.listFilterProducts.push(element);
      } else if(element.codigo.toLocaleLowerCase().includes(this.compraseleccionadas.codigo.toLocaleLowerCase())){
        this.listFilterProducts.push(element);
      }
    });
    this.llenarTabla(this.listFilterProducts);*/
  }

  seleccionTabla(compra:ComprasElement){
    //this.compraseleccionadas = compra;
  }

  quitarSeleccion(){
    this.compraseleccionadas = [];
    this.searchProduct();
  }
}

export interface ComprasModel {
	codigo: string;
	producto: string;
	prod_total: number;
	costo_compra: number;
	cantidad: number;
	costo_compra_total: number;
	costo_venta: number;
  id: number;
  costo_venta2: number;
  costo_venta3: number;
  iva: number;
}
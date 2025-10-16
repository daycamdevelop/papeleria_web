import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CompraService } from '../../shared/services/compra.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';
import { ProductosElement, ProductosTablaCompraElement } from '../../shared/model/ProductosElement';
import { ProductoService } from '../../shared/services/producto.service';
import { EditValueComponent } from '../../shared/components/edit-value/edit-value.component';
import { formatoFecha } from '../../shared/util/util';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  constructor(private router: Router) { }

  private productoService = inject(ProductoService);
  private compraService = inject(CompraService);
  private bodegaService = inject(BodegaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:ProductosElement[] = [];
  public listProductosTabla:ProductosTablaCompraElement[] = [];
  public listCompras:ProductosElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listFilterProducts:any;
  public codigoseleccionado:string = "";
  public compraSeleccionada = {
    bodega: 1,
    dinerorecibido: 0,
    cambio: 0,
    iva: 0,
    subtotal: 0,
    totalapagar: 0,
    descuento: 0,
    facturaproveedor: 0
  };
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
  descuentos: number[] = Array.from({ length: 100 }, (_, i) => i);
  bodegas: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getBodegas();
    this.getProductos();
    this.getCompras();
    this.cargarEventos();
  }

  cargarEventos(){
    const codigo = document.querySelector<HTMLInputElement>('#codigo');
    codigo?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.agregarProducto();
      }
    });
  }

  route(route:string): void {
    this.router.navigate(['/dashboard/'+route]);
  }

  displayedColumns: string[] = ["codigo", "producto", "prodtotal", "costo compra", "cantidad", "costo compra total", "costoventa", "id", "costoventa2", "costoventa3", "iva"];
  
  dataSource = new MatTableDataSource<ProductosTablaCompraElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  realizarCompra(credito:boolean) {
    let body = {
      "numfactura": this.obtenerMayor(this.listCompras, "numfactura") + 1,
      "fechafactura": formatoFecha(new Date()),
      "proveedor": "1",
      "producto": 0,
      "catidadproductos": 0,
      "estado": "activo",
      "precio": 0,
      "precio_unitario": 0,
      "usuario": "1",
      "num_preliminar": null,
      "precio_venta": 0,
      "credito": credito ? this.compraSeleccionada.totalapagar : 0,
      "numfacturap": null,
      "formapago": "EFECTIVO",
      "origen": "Web",
      "precio_venta2": 0,
      "precio_venta3": 0,
      "dinerorecibido": this.compraSeleccionada.totalapagar,
      "cambio": this.compraSeleccionada.cambio,
      "subtotal": this.compraSeleccionada.subtotal,
      "ivavalor": this.compraSeleccionada.iva,
      "porcentaje": this.compraSeleccionada.descuento,
      "bodega": "1",
      "registro": null,
      "registro2": null
    }
    this.listProductosTabla.forEach((element: ProductosTablaCompraElement, i) => {
      body.producto = element.id;
      body.catidadproductos = element.cantidad;
      body.precio = element.costocompratotal;
      body.precio_unitario = element.costocompra;
      body.precio_venta = element.costoventa;
      body.precio_venta2 = element.costoventa2;
      body.precio_venta3 = element.costoventa3;

      this.compraService.saveCompra(body).subscribe((result: any) => {
        this.openSnackBar("Compra Realizada", "Exitoso");
        this.borrarProducto();
        this.getCompras();
      })
    });
  }

  seleccionTabla(producto:ProductosElement){
    this.productoSeleccionado = producto;
    const searchInput = document.querySelectorAll<HTMLInputElement>('#producto-codigo');
    searchInput?.forEach(element => {
      console.log(element)
      let child = element?.firstChild as Element | null;
      console.log(child?.innerHTML);
      let valorCodigo = child?.innerHTML.replaceAll(" ", ""); 
      if(valorCodigo == this.productoSeleccionado.codigo){
        console.log('Si'+this.productoSeleccionado.codigo)
        element.classList.add('selected');
      } else {
        console.log('No'+this.productoSeleccionado.codigo)
        element.classList.remove('selected');
      }
    });
  }

  getProductos(): void {
    this.productoService.getProduct()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listProductos = data.productoResponse.producto;
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getCompras(): void {
    this.compraService.getCompra()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listCompras = data.compraResponse.compra;
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

  llenarTabla(dataClient:ProductosTablaCompraElement[]){
    this.calcularValores();
    this.dataSource = new MatTableDataSource<ProductosTablaCompraElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  busquedaRapida(){
    
  }

  editarValor(element: ProductosTablaCompraElement, atributo: keyof ProductosTablaCompraElement): void {
    let dataElement:any = element[atributo];
    console.log("Valor "+dataElement)
    const dialogRef = this.dialog.open(EditValueComponent, {
      width: '350px',
      height: '250px',
      data: dataElement
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      
      this.listProductosTabla.forEach((elementList: ProductosTablaCompraElement) => {
        if(element.id == elementList.id){
          elementList[atributo] = result ? result : 0;
          return;
        }
      });
      this.llenarTabla(this.listProductosTabla);
    });
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  agregarProducto(){
    let encontrado = false;
    let exist = false;

    this.listProductosTabla.forEach((element: ProductosTablaCompraElement, i) => {
      if(element.codigo == this.codigoseleccionado){
        element.cantidad += 1;
        encontrado = true;
        exist = true;
      }
    });

    if(!encontrado){
      this.listProductos.forEach((element: ProductosElement) => {
        if(element.codigo == this.codigoseleccionado){
          this.listProductosTabla.push({
            id: element.id,
            codigo: element.codigo,
            producto: element.nombre,
            prodtotal: "0",
            cantidad: 1,
            bodega: element.bodega,
            costocompra: element.costo,
            costocompratotal: element.costo,
            costoventa: element.costoventa,
            costoventa2: element.costoventa2,
            costoventa3: element.costoventa3,
            iva: element.iva,
          });
          exist = true;
          return;
        }
      });
    }
    this.codigoseleccionado = "";
    this.llenarTabla(this.listProductosTabla);
    
    if(!exist){
      alert("Producto no encontrado");
    }
  }

  borrarProducto(){
    this.compraSeleccionada = {
      bodega: 1,
      dinerorecibido: 0,
      cambio: 0,
      iva: 0,
      subtotal: 0,
      totalapagar: 0,
      descuento: 0,
      facturaproveedor: 0
    };
    this.listProductosTabla = [];
    this.llenarTabla(this.listProductosTabla);
  }

  calcularValores(){
    let total = 0;
    this.listProductosTabla.forEach((element: ProductosTablaCompraElement) => {
      element.costocompratotal = element.costocompra * element.cantidad;
      total += element.costocompratotal
    });
    total = this.ajustarValor(total * (1 - (this.compraSeleccionada.descuento / 100)));
    this.compraSeleccionada.dinerorecibido = total;
    this.compraSeleccionada.iva = this.ajustarValor(total * 0.19);
    this.compraSeleccionada.subtotal = this.ajustarValor(this.compraSeleccionada.dinerorecibido - this.compraSeleccionada.iva);
    this.compraSeleccionada.totalapagar = total;
  }

  limpiarProducto(){
    this.listProductosTabla.forEach((element: ProductosTablaCompraElement, i) => {
      if(element.codigo == this.productoSeleccionado.codigo){
        this.listProductosTabla.splice(i, 1);
        this.llenarTabla(this.listProductosTabla);
        return;
      }
    });
  }

  obtenerMayor(array:any[], attrib:string){
    let mayor = 0;
    array.forEach((val:any)=>{
      if(parseInt(val[attrib]) > mayor){
        mayor = parseInt(val[attrib]);
      }
    })
    return mayor;
  }

  ajustarValor(numero:number){
    let valor = numero.toFixed(2); // "123.46"
    return parseFloat(valor)
  }
}
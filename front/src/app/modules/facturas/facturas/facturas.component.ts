import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaService } from '../../shared/services/factura.service';
import { MatPaginator } from '@angular/material/paginator';
import { forkJoin, of, Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';
import { ProductosElement, ProductosTablaFacturaElement } from '../../shared/model/ProductosElement';
import { ProductoService } from '../../shared/services/producto.service';
import { EditValueComponent } from '../../shared/components/edit-value/edit-value.component';
import { formatoFecha } from '../../shared/util/util';
import { VendedorService } from '../../shared/services/vendedor.service';
import { VendedorElement } from '../../shared/model/VendedorElement';
import { PdfService } from '../../shared/services/pdf.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  constructor(private router: Router, private pdfService:PdfService) { }

  private productoService = inject(ProductoService);
  private facturaService = inject(FacturaService);
  private bodegaService = inject(BodegaService);
  private vendedorService = inject(VendedorService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:ProductosElement[] = [];
  public listProductosTabla:ProductosTablaFacturaElement[] = [];
  public listFacturas:ProductosElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listVendedores:VendedorElement[] = [];
  public listFilterProducts:any;
  public facturaSeleccionada = {
    bodega: 1,
    vendedor: 1,
    dinerorecibido: 0,
    dinerorecibido1: 0,
    cambio: 0,
    iva: 0,
    subtotal: 0,
    totalapagar: 0,
    descuento: 0,
    facturaproveedor: 0,
    costos: 1,
    tirilla: "1",
    formapago: "EFECTIVO",
    formapago1: "NINGUNO",
  };
  public codigoSeleccionado:string = "";
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
  vendedores: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getBodegas();
    this.getVendedores();
    this.getProductos();
    this.getFacturas();
    this.cargarEventos();
  }

  cargarEventos(){
    
  }

  route(route:string): void {
    this.router.navigate(['/dashboard/'+route]);
  }

  displayedColumns: string[] = ["codigo", "producto", "prodtotal", "costo venta", "cantidad", "costo venta total", "id", "iva", "costo compra", "serial"];
  
  dataSource = new MatTableDataSource<ProductosTablaFacturaElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  realizarFactura(credito:boolean) {
    let bodyI = {
      "numfactura": this.obtenerMayor(this.listFacturas, "numfactura") + 1,
      "fechafactura": formatoFecha(new Date()),
      "cliente": "1",
      "producto": 0,
      "catidadproductos": 0,
      "estado": "activo",
      "precio": 0,
      "credito": credito ? this.facturaSeleccionada.totalapagar : 0,
      "precio_unitario": 0,
      "fecha_anulacion": null,
      "usuario": 1,
      "vendedor": this.vendedores.find((ven)=>ven.value == this.facturaSeleccionada.bodega).viewValue,
      "porcentaje": this.facturaSeleccionada.descuento,
      "origen": "Web",
      "formapago": this.facturaSeleccionada.formapago,
      "dinerorecibido": this.facturaSeleccionada.dinerorecibido,
      "cambio": this.facturaSeleccionada.cambio,
      "costoventa2": 0,
      "costoventa3": 0,
      "codigocredito": null,
      "imprimir": true,
      "subtotal": this.facturaSeleccionada.subtotal,
      "ivavalor": this.facturaSeleccionada.iva,
      "fechaimpresion": formatoFecha(new Date()),
      "bodega": this.facturaSeleccionada.bodega,
      "notacredito": null,
      "fechacredito": '',
      "formapago1": this.facturaSeleccionada.formapago1,
      "dinerorecibido1": this.facturaSeleccionada.dinerorecibido1,
      "registro": null,
      "registro2": null,
      "caja": "Caja 1"
    }
    let peticiones = this.listProductosTabla
      .filter(element => element.selected)
      .map((element: ProductosTablaFacturaElement) => {
        const body = {
          ...bodyI,
          producto: element.id,
          catidadproductos: element.cantidad,
          precio: element.costoventatotal,
          precio_unitario: element.costoventa
        };
        return this.facturaService.saveFactura(body);
        return of({
    "metadata": [
        {
            "date": "Thu Oct 16 15:24:27 GMT-05:00 2025",
            "code": "200",
            "description": "Respuesta exitosa",
            "type": "Respuesta OK"
        }
    ],
    "facturaResponse": {
        "factura": [
            {
                "id": 181,
                "numfactura": 1,
                "fechafactura": "2025/07/18 18:58",
                "cliente": 1,
                "producto": 7902,
                "catidadproductos": "1",
                "estado": "activo",
                "precio": 9000,
                "credito": 9000,
                "precio_unitario": 9000,
                "fecha_anulacion": null,
                "usuario": 1,
                "vendedor": "mostrador",
                "porcentaje": 0,
                "origen": "Cliente",
                "formapago": "EFECTIVO",
                "dinerorecibido": 9000,
                "cambio": 0,
                "costoventa2": 0,
                "costoventa3": 0,
                "codigocredito": null,
                "imprimir": true,
                "subtotal": 9000,
                "ivavalor": 0,
                "fechaimpresion": "2025/07/18 18:58",
                "bodega": 1,
                "notacredito": null,
                "fechacredito": "",
                "formapago1": "NINGUNO",
                "dinerorecibido1": 0,
                "registro": null,
                "registro2": null,
                "caja": "Caja 1"
            }
        ]
    }
});
      });

    if (peticiones.length === 0) {
      return;
    }

    forkJoin(peticiones).subscribe({
      next: (resultados) => {
        this.openSnackBar("Factura Realizada", "Exitoso");
        this.borrarProducto();
        this.getFacturas();        
        this.pdfService.generarPDF({
          type: "Factura",
          products: resultados,
          body: bodyI
        });
      },
      error: (err) => console.error('Error en alguna llamada:', err)
    });
  }

  seleccionTabla(producto:ProductosElement){
    this.productoSeleccionado = producto;
    const searchInput = document.querySelectorAll<HTMLInputElement>('#producto-codigo');
    searchInput?.forEach(element => {
      let child = element?.firstChild as Element | null;
      let valorCodigo = child?.innerHTML.replaceAll(" ", ""); 
      if(valorCodigo == this.productoSeleccionado.codigo){
        if(element.classList.contains('selectedVenta')){
          //element.classList.remove('selectedVenta');
          element.classList.add('selected');
        } else if(element.classList.contains('selected')){
          element.classList.remove('selected');
          element.classList.add('selectedVenta');
          this.listProductosTabla.map(lp=>{
            if(lp.codigo == this.productoSeleccionado.codigo || lp.selected){
              lp.selected = true;
            } else {
              lp.selected = false;
            }
          })
          this.listProductosTabla = this.listProductosTabla.filter(lp=>lp.selected);
          this.codigoSeleccionado = "";
        } else {
          element.classList.add('selected');
        }
      } else {
        if(element.classList.contains('selected')){
          element.classList.remove('selected');
        }
      }
    });
    this.llenarTabla(this.listProductosTabla);
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

  getFacturas(): void {
    this.facturaService.getFactura()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listFacturas = data.facturaResponse.factura;
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

  getVendedores(): void {
    this.vendedorService.getVendedor()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listVendedores = data.vendedorResponse.vendedor;
          this.listVendedores.forEach((element: VendedorElement) => {
            this.vendedores.push({value: element.id, viewValue: element.nombre});
          });
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  llenarTabla(dataClient:ProductosTablaFacturaElement[]){
    dataClient = dataClient.sort((a,b)=> {
      const numA = a ? 1 : 0;
      const numB = b ? 1 : 0;
      return numA - numB;
    });
    this.calcularValores();
    this.dataSource = new MatTableDataSource<ProductosTablaFacturaElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  editarValor(element: ProductosTablaFacturaElement, atributo: keyof ProductosTablaFacturaElement): void {
    if(element.selected){
      let dataElement:any = element[atributo];
      console.log("Valor "+dataElement)
      const dialogRef = this.dialog.open(EditValueComponent, {
        width: '350px',
        height: '250px',
        data: dataElement
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        this.listProductosTabla.forEach((elementList: ProductosTablaFacturaElement) => {
          if(element.id == elementList.id){
            elementList[atributo] = result ? result : 0;
            return;
          }
        });
        this.llenarTabla(this.listProductosTabla);
      });
    }
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  agregarProducto(event:Event){
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    this.listProductosTabla = this.listProductosTabla.filter(lp=>lp.selected);
    this.listProductos.forEach((element: ProductosElement) => {
      if(
        (element.codigo.includes(inputValue) ||
        element.nombre.includes(inputValue)) && 
        !this.listProductosTabla.find(lp=>lp.codigo == element.codigo)
      ){
        this.listProductosTabla.push({
          id: element.id,
          codigo: element.codigo,
          producto: element.nombre,
          prodtotal: "0",
          cantidad: 1,
          bodega: element.bodega,
          costoventa: element.costoventa,
          costoventatotal: element.costoventa,
          costoventa2: element.costoventa2,
          costoventa3: element.costoventa3,
          iva: element.iva,
          costocompra: element.costo,
          serial: element.serial,
          selected: false
        });
      }
    });
    this.llenarTabla(this.listProductosTabla);
  }

  borrarProducto(){
    this.facturaSeleccionada = {
    bodega: 1,
    vendedor: 1,
    dinerorecibido: 0,
    dinerorecibido1: 0,
    cambio: 0,
    iva: 0,
    subtotal: 0,
    totalapagar: 0,
    descuento: 0,
    facturaproveedor: 0,
    costos: 1,
    tirilla: "1",
    formapago: "EFECTIVO",
    formapago1: "NINGUNO",
  };
    this.listProductosTabla = [];
    this.llenarTabla(this.listProductosTabla);
  }

  calcularValores(){
    let total = 0;
    this.listProductosTabla.forEach((element: ProductosTablaFacturaElement) => {
      if(element.selected){
        element.costoventatotal = element.costoventa * element.cantidad;
        total += element.costoventatotal
      }
    });
    total = this.ajustarValor(total * (1 - (this.facturaSeleccionada.descuento / 100)));
    this.facturaSeleccionada.dinerorecibido = total;
    this.facturaSeleccionada.iva = this.ajustarValor(total * 0.19);
    this.facturaSeleccionada.subtotal = this.ajustarValor(this.facturaSeleccionada.dinerorecibido - this.facturaSeleccionada.iva);
    this.facturaSeleccionada.totalapagar = total;
  }

  limpiarProducto(){
    this.listProductosTabla.forEach((element: ProductosTablaFacturaElement, i) => {
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
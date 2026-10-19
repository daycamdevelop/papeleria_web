import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaElectronicaService } from '../../shared/services/factura-electronica.service';
import { MatPaginator } from '@angular/material/paginator';
import { forkJoin, Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { ProductosElement, ProductosTablaFacturaElement } from '../../shared/model/ProductosElement';
import { ProductoService } from '../../shared/services/producto.service';
import { EditValueComponent } from '../../shared/components/edit-value/edit-value.component';
import { formatoFecha } from '../../shared/util/util';
import { VendedorService } from '../../shared/services/vendedor.service';
import { VendedorElement } from '../../shared/model/VendedorElement';
import { PdfService } from '../../shared/services/pdf.service';
import { SelectClienteComponent } from '../../cliente/select-cliente/select-cliente.component';
import { EmissionService } from '../../shared/services/emission.service';
import { getData } from '../../shared/util/Emission';
import { ResolucionService } from '../../shared/services/resolucion.service';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../../shared/util/EncryptionUtil';
import { FacturaElement } from '../../shared/model/FacturaElement';
import { ClienteService } from '../../shared/services/cliente.service';
import { ClientElement } from '../../shared/model/ClienteElement';

@Component({
  selector: 'app-factura-electronica',
  templateUrl: './factura-electronica.component.html',
  styleUrls: ['./factura-electronica.component.css']
})
export class FacturaElectronicaComponent {
  constructor(private router: Router, private pdfService:PdfService, private emissionService:EmissionService, private resolucionService:ResolucionService, private encryptionService:EncryptionService) { }

  private productoService = inject(ProductoService);
  private facturaElectronicaService = inject(FacturaElectronicaService);
  private bodegaService = inject(BodegaService);
  private vendedorService = inject(VendedorService);
  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductos:ProductosElement[] = [];
  public listProductosTabla:ProductosTablaFacturaElement[] = [];
  public listFacturaElectronica:ProductosElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listVendedores:VendedorElement[] = [];
  public listFilterProducts:any;
  public facturaEmitida:FacturaElement = {
    bodega: '',
    caja: '',
    cambio: '',
    catidadproductos: '',
    cliente: '',
    codigocredito: '',
    costoventa2: '',
    costoventa3: '',
    credito: '',
    dinerorecibido: '',
    dinerorecibido1: '',
    estado: '',
    fecha_anulacion: '',
    fechacredito: '',
    fechafactura: '',
    fechaimpresion: '',
    formapago: '',
    formapago1: '',
    imprimir: '',
    ivavalor: '',
    notacredito: '',
    numfactura: '',
    origen: '',
    porcentaje: '',
    precio: '',
    precio_unitario: '',
    producto: '',
    registro: '',
    registro2: '',
    subtotal: '',
    usuario: '',
    vendedor: '',
    estado_fac: '',
    cufe: '',
    productos: [],
    clienteDV: '',
    clienteNombre: '',
    clienteTelefono: '',
    clienteDireccion: '',
    clienteCorreo: '',
    clienteTipoDoc: '',
    clienteTipopersona: '',
    clienteCodigoDane: '',
    clienteTipoiva: ''
  };
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
    tirilla: "3",
    formapago: "EFECTIVO",
    formapago1: "NINGUNO",
    clienteId: 1,
    clienteNombre: 'Ocasional',
    clienteNit: 'X',
    clienteDV: '',
    clienteTelefono: '',
    clienteDireccion: '',
    clienteCorreo: '',
    clienteTipoDoc: '',
    clienteTipopersona: '',
    clienteCodigoDane: '',
    clienteTipoiva: '',
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
    this.getResolucion();
    this.getVendedores();
    this.getProductos();
    this.getClient();
    this.getFacturaElectronica();
    this.cargarEventos();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.seleccion(true);
    }
    if (event.key === 'ArrowDown') {
      this.seleccion(false);
    }
    if (event.key === 'Enter') {
      this.seleccionTabla(this.codigoSeleccionado, true);
    }
  }
  
  cargarEventos(){
    const myInput = document.getElementById("MyInput") as HTMLInputElement;
    if (myInput) {
      setTimeout(() => {
        myInput.focus();
      }, 300);
    }
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

  getClient(): void {
    this.clienteService.getCliente().subscribe(
      (data: any) => {
        if (data.metadata[0].code === '200') {
          let listClient = data.clienteResponse.cliente;
          listClient.forEach((element: ClientElement) => {
            if(element.id == 1){
              this.cargarClienteOcasional(element);
            }
          });
        }
      },
      (error: any) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  cargarClienteOcasional(cliente:ClientElement) {
    this.facturaSeleccionada.clienteId = cliente.id||1;
    this.facturaSeleccionada.clienteNombre = cliente.nombre||'';
    this.facturaSeleccionada.clienteNit = cliente.nit||'';
    this.facturaSeleccionada.clienteDV = cliente.dv||'';
    this.facturaSeleccionada.clienteTelefono = cliente.telefono+''||'';
    this.facturaSeleccionada.clienteDireccion = cliente.direccion||'';
    this.facturaSeleccionada.clienteCorreo = cliente.correo||'';
    this.facturaSeleccionada.clienteTipoDoc = cliente.tipo||'';
    this.facturaSeleccionada.clienteTipopersona = cliente.tipopersona||'';
    this.facturaSeleccionada.clienteCodigoDane = cliente.ciudaddane||'';
    this.facturaSeleccionada.clienteTipoiva = cliente.tipoiva||'';
  }

  realizarFactura(credito:boolean) {
    let bodyI:FacturaElement = {
      "numfactura": (this.obtenerMayor(this.listFacturaElectronica, "numfactura") + 1) + "",
      "fechafactura": formatoFecha(new Date()),
      "cliente": this.facturaSeleccionada.clienteId + "",
      "producto": "0",
      "catidadproductos": "0",
      "estado": "activo",
      "precio": "0",
      "credito": credito ? this.facturaSeleccionada.totalapagar + "" : "0",
      "precio_unitario": "0",
      "fecha_anulacion": "null",
      "usuario": "1",
      "vendedor": this.vendedores.find((ven) => ven.value == this.facturaSeleccionada.bodega).viewValue,
      "porcentaje": this.facturaSeleccionada.descuento + "",
      "origen": "Web",
      "formapago": this.facturaSeleccionada.formapago,
      "dinerorecibido": this.facturaSeleccionada.dinerorecibido + "",
      "cambio": this.facturaSeleccionada.cambio + "",
      "costoventa2": "0",
      "costoventa3": "0",
      "codigocredito": "null",
      "imprimir": "true",
      "subtotal": this.facturaSeleccionada.subtotal + "",
      "ivavalor": this.facturaSeleccionada.iva + "",
      "fechaimpresion": formatoFecha(new Date()),
      "bodega": this.facturaSeleccionada.bodega + "",
      "notacredito": "null",
      "fechacredito": '',
      "formapago1": this.facturaSeleccionada.formapago1,
      "dinerorecibido1": this.facturaSeleccionada.dinerorecibido1 + "",
      "registro": "null",
      "registro2": "null",
      "caja": "Caja 1",
      "estado_fac": "1",
      "cufe": "---"
    }
    this.facturaEmitida = {
      ...bodyI,
      productos: [],
      clienteDV: this.facturaSeleccionada.clienteDV,
      clienteNombre: this.facturaSeleccionada.clienteNombre,
      clienteTelefono: this.facturaSeleccionada.clienteTelefono,
      clienteDireccion: this.facturaSeleccionada.clienteDireccion,
      clienteCorreo: this.facturaSeleccionada.clienteCorreo,
      clienteTipoDoc: this.facturaSeleccionada.clienteTipoDoc,
      clienteTipopersona: this.facturaSeleccionada.clienteTipopersona,
      clienteCodigoDane: this.facturaSeleccionada.clienteCodigoDane,
      clienteTipoiva: this.facturaSeleccionada.clienteTipoiva
    };
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
        this.facturaEmitida.productos?.push({
          producto: element.id+"",
          catidadproductos: element.cantidad+"",
          precio: element.costoventatotal+"",
          precio_unitario: element.costoventa+"",
          codProd: element.codigo,
          iva: element.iva,
          porcentaje: element.porcentaje
        });
        return this.facturaElectronicaService.saveFacturaElectronica(body);
      });

    if (peticiones.length === 0) {
      return;
    }

    forkJoin(peticiones).subscribe({
      next: () => {
        this.getFacturaElectronica();
        this.facturaElectronicaService.getFacturaElectronicaPDF(bodyI.numfactura).subscribe((data:any)=>{
          if (data.metadata[0].code == "200") {
            data.factura_electronicaPDFResponse.factura_electronicaPDF[0].tirilla = this.facturaSeleccionada.tirilla;
            this.pdfService.generarPDF({
              type: "Factura",
              body: data.factura_electronicaPDFResponse.factura_electronicaPDF
            });
            this.setFacturaElectronica();
          }
        })
        
        this.borrarProducto();
      },
      error: (err) => console.error('Error en alguna llamada:', err)
    });
  }

  setFacturaElectronica(){
    let body = getData(this.facturaEmitida);
    console.log(body)
    this.emissionService.setFacturaElectronica(body).subscribe((data:any)=>{
      if (data.metadata[0].code == "200") {
        this.openSnackBar("Factura Electronica Realizada", "Exitoso");
      }
    })
  }

  seleccionTabla(producto:string, directSelect:boolean){
    let found = false;
    for (const p of this.listProductos) {
      if(p.codigo == producto){
        this.productoSeleccionado = p;
        found = true;
        break;
      }
    }
    const searchInput = document.querySelectorAll<HTMLInputElement>('#producto-codigo');
    if(found){
      searchInput?.forEach(element => {
        let child = element?.firstChild as Element | null;
        let valorCodigo = child?.innerHTML.replaceAll(" ", ""); 
        if(valorCodigo == this.productoSeleccionado.codigo){
          if(element.classList.contains('selectedVenta')){
            if(directSelect){
              for (const p of this.listProductosTabla) {
                if(p.codigo == this.productoSeleccionado.codigo){
                  p.cantidad += 1;
                  this.codigoSeleccionado = "";
                  this.listProductosTabla = this.listProductosTabla.filter(lp=>lp.selected);
                  break;
                }
              }
            } else {
              element.classList.add('selected');
            }
          } else if(element.classList.contains('selected') || directSelect){
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
    } else {
      found = false;
      searchInput?.forEach(element => {
        if(element.classList.contains('selected')){
          found = true;
          element.classList.remove('selected');
          element.classList.add('selectedVenta')
          let child = element?.firstChild as Element | null;
          let valorCodigo = child?.innerHTML.replaceAll(" ", ""); 
          for (const p of this.listProductos) {
            if(p.codigo == valorCodigo){
              this.productoSeleccionado = p;
              break;
            }
          }
          this.listProductosTabla.map(lp=>{
            if(lp.codigo == this.productoSeleccionado.codigo || lp.selected){
              lp.selected = true;
            } else {
              lp.selected = false;
            }
          })
          this.listProductosTabla = this.listProductosTabla.filter(lp=>lp.selected);
          this.codigoSeleccionado = "";
        }
      });/*
      if(!found){
        this.codigoSeleccionado = "";
        this.openSnackBar("Producto no encontrado", "ERROR");
      }*/
    }
    this.llenarTabla(this.listProductosTabla);
  }

  seleccion(up:boolean){
    const searchInput:any = document.querySelectorAll<HTMLInputElement>('#producto-codigo');
    if(searchInput.length > 0){
      let found = false;
      for (let i = 0; i < searchInput.length; i++) {
        if(searchInput[i].classList.contains('selected')){
          found = true;
          if(up){
            if(i > 0){
              searchInput[i-1].classList.add('selected');
              searchInput[i-1].scrollIntoView({ behavior: 'smooth', block: 'center' });
              searchInput[i].classList.remove('selected');
            }
          } else {
            if(searchInput.length-1 > i){
              searchInput[i+1].classList.add('selected');
              searchInput[i+1].scrollIntoView({ behavior: 'smooth', block: 'center' });
              searchInput[i].classList.remove('selected');
            }
          }
          break;
        }
      }
      if(!found){
        searchInput[0].classList.add('selected');
      }
    }

  }

  getProductos(): void {
    this.productoService.getProduct()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listProductos = data.productoResponse.producto;
        }
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getFacturaElectronica(): void {
    this.facturaElectronicaService.getFacturaElectronica()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.listFacturaElectronica = data.facturaElectronicaResponse.facturaElectronica;
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
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  getResolucion(): void {
    this.resolucionService.getResolucion()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          let resolucion = data.resolucionResponse.resolucion.filter((val:any)=>val.prefijo == "SETP")[0];
          environment.resolucion = {
            numresolucion: this.encryptionService.decrypt(resolucion.numresolucion),
            prefijo: resolucion.prefijo,
            numfacinico: resolucion.numfacinico,
            numfacfinal: resolucion.numfacfinal,
            resfecinicio: resolucion.resfecinicio,
            resfecfinal: resolucion.resfecfinal,
            url: this.encryptionService.decrypt(resolucion.url),
            token: this.encryptionService.decrypt(resolucion.token),
            correo: resolucion.correo,
            pass: resolucion.pass,
            nit: this.encryptionService.decrypt(resolucion.nit),
            ciudad: this.encryptionService.decrypt(resolucion.ciudad),
            cantidad: resolucion.cantidad,
            licfecinicio: resolucion.licfecinicio,
            licfecfinal: resolucion.licfecfinal,
            prefijopers: this.encryptionService.decrypt(resolucion.prefijopers)
          };
        }
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
    this.calcularValores(false);
    this.dataSource = new MatTableDataSource<ProductosTablaFacturaElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  editarValor(element: ProductosTablaFacturaElement, atributo: keyof ProductosTablaFacturaElement): void {
    if(element.selected){
      let dataElement:any = element[atributo];
      const dialogRef = this.dialog.open(EditValueComponent, {
        width: '350px',
        height: '250px',
        data: {
          valor: dataElement,
          tipo: atributo == 'cantidad' ? 1 : 2
        },
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

  seleccionarCliente(){
      const dialogRef = this.dialog.open(SelectClienteComponent, {
        width: '80%',
        height: '50%',
        data: 'Facturar'
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if(result){
          this.facturaSeleccionada.clienteId = result.id;
          this.facturaSeleccionada.clienteNombre = result.nombre;
          this.facturaSeleccionada.clienteNit = result.nit;
          this.facturaSeleccionada.clienteDV = result.dv;
          this.facturaSeleccionada.clienteTelefono = result.telefono;
          this.facturaSeleccionada.clienteDireccion = result.direccion;
          this.facturaSeleccionada.clienteCorreo = result.correo;
          this.facturaSeleccionada.clienteTipoDoc = result.tipo;
          this.facturaSeleccionada.clienteTipopersona = result.tipopersona;
          this.facturaSeleccionada.clienteCodigoDane = result.ciudaddane;
          this.facturaSeleccionada.clienteTipoiva = result.tipoiva;
        }
      });
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
        (element.codigo.includes(inputValue) || element.nombre.includes(inputValue)) && 
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
          selected: false,
          porcentaje: 0
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
      clienteId: 1,
      clienteNombre: 'Ocasional',
      clienteNit: 'X',
      clienteDV: '',
      clienteTelefono: '',
      clienteDireccion: '',
      clienteCorreo: '',
      clienteTipoDoc: '',
      clienteTipopersona: '',
      clienteCodigoDane: '',
      clienteTipoiva: '',
    };
    this.listProductosTabla = [];
    this.llenarTabla(this.listProductosTabla);
    this.codigoSeleccionado = "";
  }

  calcularValores(calcularcambio:boolean){
    let total = 0;
    this.listProductosTabla.forEach((element: ProductosTablaFacturaElement) => {
      if(element.selected){
        element.costoventatotal = Number.parseInt(element.costoventa+"") * Number.parseInt(element.cantidad+"");
        total += element.costoventatotal
      }
    });
    total = this.ajustarValor(total * (1 - (this.facturaSeleccionada.descuento / 100)));
    if(calcularcambio){
      this.facturaSeleccionada.cambio = (parseInt(this.facturaSeleccionada.dinerorecibido+"") + parseInt(this.facturaSeleccionada.dinerorecibido1+"")) - total;
    } else {
      this.facturaSeleccionada.dinerorecibido = total;
      this.facturaSeleccionada.dinerorecibido1 = 0;
      this.facturaSeleccionada.cambio = 0;
    }
    this.facturaSeleccionada.iva = this.ajustarValor(total * 0.19);
    this.facturaSeleccionada.subtotal = this.ajustarValor(total - this.facturaSeleccionada.iva);
    this.facturaSeleccionada.totalapagar = total;
  }

  limpiarProducto(){
    this.listProductosTabla.forEach((element: ProductosTablaFacturaElement, i) => {
      if(element.codigo == this.productoSeleccionado.codigo){
        this.listProductosTabla.splice(i, 1);
        this.llenarTabla(this.listProductosTabla);
        this.codigoSeleccionado = "";
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

  navigateTo(route: string): void {
    // Aseguramos que las rutas comiencen con 'dashboard'
    this.router.navigate([`/dashboard/factura_electronica/${route}`]);
  }
}
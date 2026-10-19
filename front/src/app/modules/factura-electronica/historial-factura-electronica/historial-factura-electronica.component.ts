import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaElectronicaService } from '../../shared/services/factura-electronica.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { ProductosElement, ProductosTablaFacturaElement } from '../../shared/model/ProductosElement';
import { PdfService } from '../../shared/services/pdf.service';
import { EmissionService } from '../../shared/services/emission.service';
import { ResolucionService } from '../../shared/services/resolucion.service';
import { EncryptionService } from '../../shared/util/EncryptionUtil';
import { ClienteService } from '../../shared/services/cliente.service';
import { ClientElement } from '../../shared/model/ClienteElement';
import { UsuarioElement } from '../../shared/model/UsuarioElement';
import { UsuarioService } from '../../shared/services/usuario.service';
import { formatoEnteroAPrecio } from '../../shared/util/util';

@Component({
  selector: 'app-historial-factura-electronica',
  templateUrl: './historial-factura-electronica.component.html',
  styleUrls: ['./historial-factura-electronica.component.css']
})
export class HistorialFacturaElectronicaComponent {
  constructor(private router: Router, private pdfService:PdfService, private emissionService:EmissionService, private resolucionService:ResolucionService, private encryptionService:EncryptionService) { }

  private facturaElectronicaService = inject(FacturaElectronicaService);
  private clienteService = inject(ClienteService);
  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  listClient:ClientElement[] = [];
  listUsuario:UsuarioElement[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getClient();
    this.getUsuario();
    this.getFacturaElectronica();
  }

  displayedColumns: string[] = ["numero factura", "cliente", "fecha factura", "estado", "preciofactura", "usuario", "vendedor", "origen", "forma pago", "forma pago 2", "precio sin iva", "estado dian", "cufe"]; 
  dataSource = new MatTableDataSource<ProductosElement>();

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
          this.listClient = data.clienteResponse.cliente;
        }
      },
      (error: any) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  getUsuario(): void {
    this.usuarioService.getUsuario().subscribe(
      (data: any) => {
        if (data.metadata[0].code === '200') {
          this.listUsuario = data.usuarioResponse.usuario;
        }
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  getFacturaElectronica(): void {
    this.facturaElectronicaService.getFacturaElectronica()
      .subscribe((data: any) => {
        if (data.metadata[0].code == "200") {
          this.llenarTabla(data.facturaElectronicaResponse.facturaElectronica);
        }
        this.loading = false;
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  llenarTabla(data:ProductosElement[]){
    data = data.sort((a,b)=> {
      const numA = a ? 1 : 0;
      const numB = b ? 1 : 0;
      return numA - numB;
    });
    this.dataSource = new MatTableDataSource<ProductosElement>(data);
    this.dataSource.paginator = this.paginator;
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  validarEstadoDian(estado_fac:string, cufe:string){
    if(estado_fac == '2' && cufe.length > 0){
      return 'No Procesada';
    }

    if(estado_fac = '1'){
      return 'Procesada'
    }

    return '-';
  }

  validarCliente(cliente:number){
    let value = this.listClient.find((element: ClientElement) => {
      return element.id == cliente;
    });
    return value ? value.nombre : 'No encontrado';
  }

  validarUsuario(usuario:number){
    let value = this.listUsuario.find((element: UsuarioElement) => {
      return element.id == usuario;
    });
    return value ? value.nombres : 'No encontrado';
  }

  ajustarValor(numero:number){
    return formatoEnteroAPrecio(numero+"", true);
  }
}
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CompraService } from '../../shared/services/compra.service';
import { MatPaginator } from '@angular/material/paginator';
import { firstValueFrom, Subject } from 'rxjs';
import { BodegaService } from '../../shared/services/bodega.service';
import { BodegaElement } from '../../shared/model/BodegaElement';
import { LineaElement } from '../../shared/model/LineaElement';
import { MasivoCompraElement, ProductosElement, ProductosTablaCompraElement } from '../../shared/model/ProductosElement';
import { ProductoService } from '../../shared/services/producto.service';
import { EditValueComponent } from '../../shared/components/edit-value/edit-value.component';
import { formatoFecha } from '../../shared/util/util';
import { importExcel } from '../../shared/util/excel';
import { LineaService } from '../../shared/services/linea.service';

@Component({
  selector: 'app-masivo',
  templateUrl: './masivo.component.html',
  styleUrls: ['./masivo.component.css']
})
export class MasivoComponent {
  constructor(private router: Router) { }

  private productoService = inject(ProductoService);
  private bodegaService = inject(BodegaService);
  private lineaService = inject(LineaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listProductosTabla:MasivoCompraElement[] = [];
  public listBodegas:BodegaElement[] = [];
  public listLineas:LineaElement[] = [];
  descuentos: number[] = Array.from({ length: 100 }, (_, i) => i);

  bodegaSeleccionada:string = "";
  lineaSeleccionada:string = "";

  bodegas: any[] = [];
  lineas: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getBodegas();
    this.getLineas();
  }

  route(route:string): void {
    this.router.navigate(['/dashboard/'+route]);
  }

  displayedColumns: string[] = ["CODIGO", "NOMBRE", "CANTIDAD", "COSTO_COMPRA", "COSTO_VENTA", "COSTO_VENTA_2", "COSTO_VENTA_3", "SERIAL"];
  dataSource = new MatTableDataSource<MasivoCompraElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000
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

  llenarTabla(dataClient:MasivoCompraElement[]){
    this.dataSource = new MatTableDataSource<MasivoCompraElement>(dataClient);
    this.dataSource.paginator = this.paginator;
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  async cargarExcel(event: any): Promise<void> {
    let datosExcel:MasivoCompraElement[] = await importExcel(event);
    this.listProductosTabla = datosExcel.filter((val2:MasivoCompraElement)=>val2.CODIGO != '');
    this.listProductosTabla.map((val:MasivoCompraElement)=>{
      val.COSTO_COMPRA = val['COSTO COMPRA'];
      val.COSTO_VENTA = val['COSTO VENTA'];
      val.COSTO_VENTA_2 = val['COSTO VENTA 2'];
      val.COSTO_VENTA_3 = val['COSTO VENTA 3'];
    });
    console.log(this.listProductosTabla)
    this.llenarTabla(this.listProductosTabla);
  }

  async realizarMasivo() {
    if(this.bodegaSeleccionada == ''){
      this.openSnackBar('Seleccione una bodega','Error');
      return;
    }
    if(this.lineaSeleccionada == ''){
      this.openSnackBar('Seleccione una linea','Error');
      return;
    }
    let errorElements = [];
    for (const element of this.listProductosTabla) {
      const productoSeleccionado: ProductosElement = {
        codigo: element.CODIGO,
        nombre: element.NOMBRE,
        cantidad: parseInt(element.CANTIDAD),
        costo: parseInt(element.COSTO_COMPRA),
        costoventa: parseInt(element.COSTO_VENTA),
        costoventa2: parseInt(element.COSTO_VENTA_2),
        costoventa3: parseInt(element.COSTO_VENTA_3),
        serial: element.SERIAL,
        bodega: parseInt(this.bodegaSeleccionada),
        linea: parseInt(this.lineaSeleccionada),
        id: 0,
        fecharegistro: formatoFecha(new Date()),
        estado: 'activo',
        desvincular: 'NO',
        iva: 0,
        observacion: '',
        registro: '',
        registro2: ''
      };

      try {

        const result = await firstValueFrom(
          this.productoService.saveProduct(productoSeleccionado)
        );

        console.log('Guardado:', productoSeleccionado.codigo);

      } catch (error) {
        errorElements.push(element);
      }
    }
    this.listProductosTabla = errorElements;
    this.openSnackBar('¡Productos Cargados! Los elementos que quedaron en la tabla no se pudieron cargar','Error');
    this.llenarTabla(this.listProductosTabla)
  }
}
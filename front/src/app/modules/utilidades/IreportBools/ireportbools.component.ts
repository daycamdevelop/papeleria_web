import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { UtilidadesService } from '../../shared/services/utilidades.service';
import { Subject } from 'rxjs';
import { UtilidadesElement } from '../../shared/model/UtilidadesElement';

@Component({
  selector: 'app-ireportbools',
  templateUrl: './ireportbools.component.html',
  styleUrls: ['./ireportbools.component.css']
})
export class IReportBoolsComponent {
  constructor(private router: Router) { }

  private utilidadesService = inject(UtilidadesService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listUtilidades:UtilidadesElement[] = [];
  
  parametrosCampos: { [key: string]: any } = {
    verificacioncantidad_10: false,
    verificacionprecio_11: false,
    limpiar_12: false,
    borrar_13: false,
    VerificacionMasPrecVen_15: false,
    VerificacionMasCant_16: false,
    pagocredito_17: false,
    codbar_18: false,
    agrupartirilla_19: false,
    facturarbodega_20: false,
    remisiones_22: false,
    hpasscierre_23: false,
    resolucionpos_25: false,
    autoimpresion_30: false,
    tipoiva_31: "",
    tamanotirilla_32: "",
    pasamanos_33: false,
    coscomfact_34: false,
    recargarproductos_35: false,
    cierrerango_37: false,
    verificadorprecios_38: false,
    opcioncostoventa_39: false,
    guardarfactura_40: false,
    impvacio_41: false,
    cotizacion_42: false,
    medfac_45: false,
    caja_46: false,
    descuento_47: false,
    cache_48: false,
    facturacionelectronica_50: false,
    hpassanular_51: false,
    tmanopantalla_52: "",
    imprimirCelular_53: false,
    factproduccion_101: false,
    codigobarras_201: "",


  };
  parametros: any[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getParametros();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  pendiente(){
    this.openSnackBar("Pendiente de desarrollo", "Pendiente");
  }

  getParametros(): void {
    this.utilidadesService.getParametros()
    .subscribe((data: any) => {
      if (data.metadata[0].code == "200") {
        this.listUtilidades = data.parametrosResponse.parametros;
        this.listUtilidades.forEach((element: UtilidadesElement) => {
          this.parametros.push(element);
        });
      }
      this.cargarParametros();
      this.loading = false;
    }, (error: any) => {
      console.log("error: ", error);
    })
  }

  cargarParametros(){
    this.parametros.forEach(element => {
      let campo = Object.keys(this.parametrosCampos).find((x)=>x.split("_")[1] == element.id);
      if(campo){
        if (typeof this.parametrosCampos[campo] === 'string'){
          this.parametrosCampos[campo] = element.valor;
        } else {
          this.parametrosCampos[campo] = element.estado;
        }
      }
    });
  }

  actualizarParametros(){
    let body = {
      "id": 0,
      "nombre": "",
      "valor": "",
      "estado": true
    };
    this.parametros.forEach(async element => {
      let campo = Object.keys(this.parametrosCampos).find((x)=>x.split("_")[1] == element.id);
      if(campo){
        if (typeof this.parametrosCampos[campo] === 'string'){
          element.valor = this.parametrosCampos[campo];
        } else {
          element.estado = this.parametrosCampos[campo];
        }
      }
      body.id = element.id;
      body.nombre = element.nombre;
      body.valor = element.valor;
      body.estado = element.estado;
      await this.utilidadesService.saveParametros(body).subscribe();
    });
    this.cargarParametros();
    this.openSnackBar("Parametros Actualizados", "Aceptar");
  }
}
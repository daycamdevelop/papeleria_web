import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { UtilidadesService } from '../../shared/services/utilidades.service';
import { Subject } from 'rxjs';
import { UtilidadesElement } from '../../shared/model/UtilidadesElement';

@Component({
  selector: 'app-ireportcajas',
  templateUrl: './ireportcajas.component.html',
  styleUrls: ['./ireportcajas.component.css']
})
export class IReportCajasComponent {
  constructor(private router: Router) { }

  private utilidadesService = inject(UtilidadesService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public loading = false;
  searchSubject = new Subject<string>();
  public listUtilidades:UtilidadesElement[] = [];
  
  parametrosCampos: { [key: string]: any } = {
    tipoempresa_1: "",
    leyenda_2: "",
    ruta_3: "",
    titulo_4: "",
    nit_5: "",
    direccion_6: "",
    telefono1_7: "",
    telefono2_8: "",
    empresa_9: "",
    facturarbodega_20: "",
    correoReceptor_14: "",
    domicilio_21: "",
    passcierre_23: "",
    formaPago_45: "",
    correoContrasena_103: "",
    dirCliente_104: "",
    telCliente_105: "",
    ipOGC_300: "",
    nombreOGC_301: "",
    passOGC_302: "",
    puertoOGC_303: "",
    versionOGC_304: "",
    canDes_47_0: "",
    canDes1_47_1: "",
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
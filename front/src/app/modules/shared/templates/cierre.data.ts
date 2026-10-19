import { Content } from "pdfmake/interfaces";
import { PdfElement } from "../model/PdfElement";
import { formatoEnteroAPrecio } from "../util/util";

export function getContentCierre(pdfStruct:PdfElement){
    let content:Content[] = [
      { text: 'PAPELERIA 4 PAR', style: 'header', alignment: 'center' },
      {columns: [
        { width: '50%', text: 'NIT', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body.nite, style: 'subheader', alignment: 'center' }
      ]},
      { text: pdfStruct.body.direccion, style: 'subheader', alignment: 'center' },
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'TELEFONO 1', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body.tel1, style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TELEFONO 2', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body.tel2, style: 'subheader', alignment: 'center' }
      ]},
      { text: 'CIERRE', style: 'subheader', alignment: 'center' },
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'FECHA DESDE', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.fechadesdevar, style: 'subheader', alignment: 'right' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'FECHA HASTA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.fechahastavar, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'EFECTIVO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.efectivo+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'CREDITO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.credito+"", true), style: 'subheader', alignment: 'right' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'TOTAL FACTURAS', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.cont, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'INICIAL', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.mini, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'FINAL', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.maxi, style: 'subheader', alignment: 'right' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'BASE GRAVABLE', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.base+"", true), style: 'subheader', alignment: 'right' }
      ]},
      { text: ' ' },
      { text: 'EFECTIVO EN CAJA', style: 'subheader', alignment: 'center' },
      {columns: [
        { width: '50%', text: 'EFECTIVO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.efectivo+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'ABONO EFECTIVO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.abonosefectivo+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'ABONO TRANSFERENCIA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.abonostransferencia+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'ABONO TARJETA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.abonostarjeta+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'TRANFERENCIA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.transferencia+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'TARJETA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.tarjeta+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'NEQUI', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.nequi+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'DAVIPLATA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.daviplata+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'ENTRADAS', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.entrada+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'CREDITO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.credito+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'SALIDAS', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.salida+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'DEVOLUCION', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.devolucion+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'FACTURAS', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.facturas_anuladas+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'PASAMANOS', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.pasamanos+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'NOTA CREDITO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.notacredito+"", true), style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'SALDO EN CAJA', style: 'subheader', alignment: 'left' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body.saldo_caja+"", true), style: 'subheader', alignment: 'right' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'USUARIO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.usuario, style: 'subheader', alignment: 'right' }
      ]}
    ];
    
    return content;
  }
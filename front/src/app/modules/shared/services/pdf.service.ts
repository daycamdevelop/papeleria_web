import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Column, Content, ContentColumns, ContentTable, StyleDictionary, Table, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PdfElement } from '../model/PdfElement';
(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generarPDF(pdfStruct:PdfElement) {
    const docDefinition:TDocumentDefinitions = {
    pageOrientation: 'portrait',
    pageMargins: [ 10, 20, 10, 20 ],
      pageSize: {
        width: 230,
        height: 'auto'
      },
      content: this.getContent(pdfStruct),
      styles: this.getStyle(),
    };
    pdfMake.createPdf(docDefinition).download('Factura'+pdfStruct.body.numfactura+'.pdf');
  }

  getContent(pdfStruct:PdfElement){
    let content:Content[] = [
      { text: 'PAPELERIA 4 PAR', style: 'header', alignment: 'center' },
      {columns: [
        { width: '50%', text: 'NIT', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '901944242*', style: 'subheader', alignment: 'center' }
      ]},
      { text: 'CALLE 53 N 13-58*', style: 'subheader', alignment: 'center' },
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'TELEFONO 1', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '123*', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TELEFONO 2', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '456*', style: 'subheader', alignment: 'center' }
      ]},
      { text: 'SALIDA DE ALMACEN*', style: 'subheader', alignment: 'center' },
      { text: ' ' },
      {columns: [
        { width: '50%', text: '# SALIDA DE ALMACEN*', style: 'subheader', alignment: 'left' },
        { width: '50%', text: '1511*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '40%', text: 'FECHA SALIDA DE ALMACEN*', style: 'subheader', alignment: 'left' },
        { width: '60%', text: pdfStruct.body.fechafactura, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'CLIENTE', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body.cliente+'*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'DIRECCION', style: 'subheader', alignment: 'left' },
        { width: '50%', text: 'Calle 1 Carrera 1*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'TELEFONO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: '3122225566*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'NIT', style: 'subheader', alignment: 'left' },
        { width: '50%', text: '2222222*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'ORIGEN', style: 'subheader', alignment: 'left' },
        { width: '50%', text: 'Web*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'VENDEDOR', style: 'subheader', alignment: 'left' },
        { width: '50%', text: 'Mostrador*', style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '40%', text: 'FECHA CREDITO', style: 'subheader', alignment: 'left' },
        { width: '60%', text: pdfStruct.body.fechacredito, style: 'subheader', alignment: 'right' }
      ]},
    ];
    content.push({ text: ' ' });
    content.push({columns: [
      { width: '40%', text: 'PRODUCTOS', style: 'table' },
      { width: '20%', text: 'CANT', style: 'table' },
      { width: '20%', text: 'UNIT', style: 'table' },
      { width: '20%', text: 'VAL', style: 'table' }
    ]});

    pdfStruct.products.forEach((element:any) => {
      content.push({columns:[
        {width: '40%', text: element.facturaResponse.factura[0].id, style: 'table'},
        {width: '20%', text: element.facturaResponse.factura[0].catidadproductos, style: 'table'},
        {width: '20%', text: element.facturaResponse.factura[0].precio_unitario, style: 'table'},
        {width: '20%', text: element.facturaResponse.factura[0].precio, style: 'table'}
      ]});
    });
    content.push({ text: ' ' });
    content.push(
      {columns: [
        { width: '50%', text: 'TOTAL ITEMS', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '2*', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TOTAL ARTICULOS', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '2*', style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'SUBTOTAL', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '0*', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'DESCUENTO', style: 'subheader', alignment: 'center' },
        { width: '10%', text: '-', style: 'subheader', alignment: 'center' },
        { width: '30%', text: '0*', style: 'subheader', alignment: 'center' },
        { width: '10%', text: '%', style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'IVA', style: 'subheader', alignment: 'center' },
        { width: '10%', text: '+', style: 'subheader', alignment: 'center' },
        { width: '30%', text: '0*', style: 'subheader', alignment: 'center' },
        { width: '10%', text: ' ', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TOTAL', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '0*', style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'EFECTIVO*', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '0*', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'NINGUNO*', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '0*', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'CAMBIO', style: 'subheader', alignment: 'center' },
        { width: '50%', text: '0*', style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      { text: 'GRACIAS POR SU COMPRA*', style: 'subheader' }
    );
    



    return content;
  }

  getStyle():StyleDictionary{
    return {
      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 30],
      },
      subheader: {
        fontSize: 10,
        bold: false,
        margin: [0, 0, 0, 5],
      },
      table: {
        fontSize: 10,
        bold: false,
        margin: [0, 0, 0, 5],
      }
    }
  }
}
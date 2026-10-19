import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Column, Content, ContentColumns, ContentTable, StyleDictionary, Table, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PdfElement } from '../model/PdfElement';
import { getContentFacturar } from '../templates/facturar.data';
import { getContentCierre } from '../templates/cierre.data';
(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generarPDF(pdfStruct:PdfElement) {
    const tirilla = pdfStruct.body.length > 0 ? pdfStruct.body[0].tirilla : pdfStruct.body.tirilla;
    const docDefinition:TDocumentDefinitions = {
    pageOrientation: 'portrait',
    pageMargins: [ 10, 20, 10, 20 ],
      pageSize: {
        width: this.obtenerTamañoTirilla(tirilla),
        height: 'auto'
      },
      content: this.obtenerContent(pdfStruct),
      styles: this.getStyle(tirilla),
    };
    pdfMake.createPdf(docDefinition).download(pdfStruct.type+this.obtenerAdicionNombrePDF(pdfStruct)+'.pdf');
  }

  obtenerTamañoTirilla(tirilla:string){
    switch(tirilla){
      case "1":
        return 160;
      case "2":
        return 230;
      case "3":
        return 600;
    }
    return 0;
  }

  obtenerAdicionNombrePDF(pdfStruct:PdfElement){
    switch(pdfStruct.type){
      case "Factura":
        return pdfStruct.body[0].numfactura;
      default:
        return "";
    }
  }

  obtenerContent(pdfStruct:PdfElement){
    switch(pdfStruct.type){
      case "Factura":
        return getContentFacturar(pdfStruct);
      case "Cierre":
        return getContentCierre(pdfStruct);
      default:
        return [];
    }
  }

  getStyle(tirilla:string):StyleDictionary{
    let tamanoHeader;
    let tamanoSubHeader;
    let tamanoTable;
    switch(tirilla){
      case "1":
        tamanoHeader = 12;
        tamanoSubHeader = 8;
        tamanoTable = 6;
        break;
      case "2":
        tamanoHeader = 14;
        tamanoSubHeader = 10;
        tamanoTable = 10;
        break;
      case "3":
        tamanoHeader = 14;
        tamanoSubHeader = 10;
        tamanoTable = 10;
        break;
      default:
        tamanoHeader = 14;
        tamanoSubHeader = 10;
        tamanoTable = 10;
    }
    return {
      header: {
        fontSize: tamanoHeader,
        bold: true,
        margin: [0, 0, 0, 30],
      },
      subheader: {
        fontSize: tamanoSubHeader,
        bold: false,
        margin: [0, 0, 0, 5],
      },
      table: {
        fontSize: tamanoTable,
        bold: false,
        margin: [0, 0, 0, 5],
      }
    }
  }
}
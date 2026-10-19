import { Content } from "pdfmake/interfaces";
import { PdfElement } from "../model/PdfElement";
import { formatoEnteroAPrecio } from "../util/util";

export function getContentFacturar(pdfStruct:PdfElement){
    let content:Content[] = [
      { text: 'PAPELERIA 4 PAR', style: 'header', alignment: 'center' },
      {columns: [
        { width: '50%', text: 'NIT', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body[0].nit, style: 'subheader', alignment: 'center' }
      ]},
      { text: pdfStruct.body[0].direccion, style: 'subheader', alignment: 'center' },
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'TELEFONO 1', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body[0].tel1, style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TELEFONO 2', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body[0].tel2, style: 'subheader', alignment: 'center' }
      ]},
      { text: pdfStruct.body[0].titulo, style: 'subheader', alignment: 'center' },
      { text: ' ' },
      {columns: [
        { width: '50%', text: '# '+pdfStruct.body[0].titulo, style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].numfactura, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '40%', text: 'FECHA '+pdfStruct.body[0].titulo, style: 'subheader', alignment: 'left' },
        { width: '60%', text: pdfStruct.body[0].fechafactura, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'CLIENTE', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].cliente, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'DIRECCION', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].direccioncli, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'TELEFONO', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].telefonocli, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'NIT', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].nite, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'ORIGEN', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].origen, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '50%', text: 'VENDEDOR', style: 'subheader', alignment: 'left' },
        { width: '50%', text: pdfStruct.body[0].vendedor, style: 'subheader', alignment: 'right' }
      ]},
      {columns: [
        { width: '40%', text: 'FECHA CREDITO', style: 'subheader', alignment: 'left' },
        { width: '60%', text: pdfStruct.body[0].fechacredito, style: 'subheader', alignment: 'right' }
      ]}
    ];
    content.push({ text: ' ' });
    content.push({columns: [
      { width: '40%', text: 'PRODUCTOS', style: 'table' },
      { width: '20%', text: 'CANT', style: 'table' },
      { width: '20%', text: 'UNIT', style: 'table' },
      { width: '20%', text: 'VAL', style: 'table' }
    ]});

    pdfStruct.body.forEach((element:any) => {
      content.push({columns:[
        {width: '40%', text: element.id, style: 'table'},
        {width: '20%', text: element.catidadproductos, style: 'table'},
        {width: '20%', text: formatoEnteroAPrecio(element.precio_unitario+"", true), style: 'table'},
        {width: '20%', text: formatoEnteroAPrecio(element.precio+"", true), style: 'table'}
      ]});
      content.push({columns:[
        {width: '40%', text: element.nombre, style: 'table'},
        {width: '20%', text: '', style: 'table'},
        {width: '20%', text: '', style: 'table'},
        {width: '20%', text: '', style: 'table'}
      ]});
    });
    content.push({ text: ' ' });
    content.push(
      {columns: [
        { width: '50%', text: 'TOTAL ITEMS', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body[0].items, style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TOTAL ARTICULOS', style: 'subheader', alignment: 'center' },
        { width: '50%', text: pdfStruct.body[0].articulos, style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'SUBTOTAL', style: 'subheader', alignment: 'center' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body[0].val2+"", true), style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'DESCUENTO', style: 'subheader', alignment: 'center' },
        { width: '10%', text: '-', style: 'subheader', alignment: 'center' },
        { width: '30%', text: pdfStruct.body[0].porcentaje, style: 'subheader', alignment: 'center' },
        { width: '10%', text: '%', style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: 'IVA', style: 'subheader', alignment: 'center' },
        { width: '10%', text: '+', style: 'subheader', alignment: 'center' },
        { width: '30%', text: formatoEnteroAPrecio(pdfStruct.body[0].iva+"", true), style: 'subheader', alignment: 'center' },
        { width: '10%', text: ' ', style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'TOTAL', style: 'subheader', alignment: 'center' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body[0].val+"", true), style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      {columns: [
        { width: '50%', text: pdfStruct.body[0].pago, style: 'subheader', alignment: 'center' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body[0].dinerorecibido+"", true), style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: pdfStruct.body[0].pago1, style: 'subheader', alignment: 'center' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body[0].dinerorecibido1+"", true), style: 'subheader', alignment: 'center' }
      ]},
      {columns: [
        { width: '50%', text: 'CAMBIO', style: 'subheader', alignment: 'center' },
        { width: '50%', text: formatoEnteroAPrecio(pdfStruct.body[0].cambio+"", true), style: 'subheader', alignment: 'center' }
      ]},
      { text: ' ' },
      { text: pdfStruct.body[0].emp1, style: 'subheader' }
    );
    return content;
  }
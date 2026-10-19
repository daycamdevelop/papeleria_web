import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportExcel(lista:any, nombre:string) {
    const hoja = XLSX.utils.json_to_sheet(lista);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Kardex');
    const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, nombre+`_${new Date().toISOString().split('T')[0]}.xlsx`);
}

export function importExcel(event: any): Promise<any[]> {
  return new Promise((resolve, reject) => {

    const archivo = event.target.files[0];

    if (!archivo) {
      resolve([]);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const datos = new Uint8Array(e.target.result);

        const workbook = XLSX.read(datos, {
          type: 'array'
        });

        const nombreHoja = workbook.SheetNames[0];
        const hoja = workbook.Sheets[nombreHoja];

        const registros = XLSX.utils.sheet_to_json<any>(hoja);

        resolve(registros);

      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(archivo);
  });
}
import { environment } from "src/environments/environment";
import { AllowanceChargesEmission, FacturaElectronicaEMission, InvoceLinesEMission, TaxTotalsEMission } from "../model/FacturaElectronicaElement";
import { FacturaElement } from "../model/FacturaElement";
import { formatoFechaSinHora } from "./util";

export function getData(facturaEmitida: FacturaElement) {
    console.log(facturaEmitida);
    console.log(environment.resolucion);
    let body:FacturaElectronicaEMission = {
        //number: facturaEmitida.numfactura,
        number: "990091950",
        //prefix: environment.resolucion.prefijopers,
        prefix: "SETP",
        document_type_code: '01',
        operation_type_code: '10',
        //resolution_number: parseInt(environment.resolucion.numresolucion),
        resolution_number: 18760000001,
        date: formatoFechaSinHora(new Date(facturaEmitida.fechafactura), '-'),
        time: '09:36:40',
        currency_type_code: 'COP',
        customer: {
            identification_number: facturaEmitida.cliente,
            name: facturaEmitida.clienteNombre + '',
            phone: facturaEmitida.clienteTelefono || '',
            address: facturaEmitida.clienteDireccion || 'El cliente no tiene Direccion',
            email: facturaEmitida.clienteCorreo || 'El cliente no tiene Email',
            merchant_registration: 'No tiene',
            identification_type_code: facturaEmitida.clienteTipoDoc || '',
            language_code: 'es',
            organization_type_code: facturaEmitida.clienteTipopersona || '',
            country_code: 'CO',
            municipality_code: facturaEmitida.clienteCodigoDane || '11001',
            regime_type_code: facturaEmitida.clienteTipoiva || '',
            tax_code: '01',
            liability_type_code: 'O-47'
        },
        payment_forms: [
            {
                payment_form_code: '1',
                payment_method_code: '10'
            }
        ],
        legal_monetary_totals: {
            line_extension_amount: 0,
            tax_exclusive_amount: 0,
            tax_inclusive_amount: 0,
            allowance_total_amount: 0,
            charge_total_amount: 0,
            payable_amount: 0
        },
        tax_totals: [],
        send: true,
        invoice_lines: []
    };
    if(facturaEmitida.clienteDV && facturaEmitida.clienteDV != "99"){
        body.customer.dv = facturaEmitida.clienteDV;
    }
    if(facturaEmitida.productos){
        let lineExtensionTotal:number = 0.00;
        let taxInclusiveTotal:number = 0.00;
        let tax_totals:TaxTotalsEMission[] = [];
        let invoice_lines:InvoceLinesEMission[] = [];
        let descuento = 0;
        let descountTotal = 0.00;
        for (let fact of facturaEmitida.productos) {

            let cant:number = parseInt(fact.catidadproductos);
            let val:number = parseInt(fact.precio_unitario);
            let iva = fact.iva;

            let taxInclusive:number = cant*val;
            taxInclusiveTotal += taxInclusive;

            let taxableAmount:number = 0.00;
            let unitTaxableAmount = 0.00;

            let percent = 0;
            switch ("IvaI") {
            case "IvaI":
                taxableAmount = taxInclusive / (1 + (iva ? iva / 100 : 0));
                percent = iva||0;
                unitTaxableAmount = taxInclusive - taxableAmount;
                break;/*
            case "IvaA":
                unitTaxableAmount = taxInclusive * (iva ? iva / 100 : 0);
                taxInclusiveTotal += unitTaxableAmount;
                percent = iva||0;
                taxableAmount = taxInclusive;
                break;
            case "SIva":
                taxableAmount = taxInclusive;
                percent = 0;
                unitTaxableAmount = 0;
                break;*/
            }

            descuento = fact.porcentaje||0;
            let allowance_charges:AllowanceChargesEmission|undefined;
            if(descuento != 0){
                let descuentoValor = taxInclusive * (descuento/100);
                allowance_charges = {
                    charge_indicator: false,
                    discount_code: "01",
                    allowance_charge_reason: "Descuento del " + descuento + "% en la factura.",
                    amount: Math.round((descuentoValor) * 100) / 100,
                    base_amount: Math.round(taxInclusive * 100) / 100
                };

                descountTotal += descuentoValor;
            }

            tax_totals.push({
                tax_code: '01',
                percent: percent,
                tax_amount: Math.round(unitTaxableAmount * 100) / 100,
                taxable_amount: Math.round(taxableAmount * 100) / 100
            });
            invoice_lines.push({
                base_quantity: 1,
                code: fact.codProd||'',
                free_of_charge_indicator: false,
                tax_totals: tax_totals,
                unit_measure_code: 'WSD',
                line_extension_amount: Math.round(taxableAmount * 100) / 100,
                description: fact.producto,
                price_amount: Math.round((taxableAmount / cant) * 100) / 100,
                invoiced_quantity: cant,
                item_identification_type_code: '999',
                allowance_charges: allowance_charges
            });

            lineExtensionTotal += Math.round(taxableAmount * 100) / 100;
            
        }
        body.tax_totals = tax_totals;
        body.invoice_lines = invoice_lines;

        body.legal_monetary_totals =  {
            line_extension_amount: Math.round(lineExtensionTotal * 100) / 100,
            tax_exclusive_amount: Math.round(lineExtensionTotal * 100) / 100,
            tax_inclusive_amount: Math.round(taxInclusiveTotal * 100) / 100,
            allowance_total_amount: 0,
            charge_total_amount: 0,
            payable_amount: (Math.round(taxInclusiveTotal * 100) / 100) - Math.round(descountTotal * 100) / 100
        };
    }
    return body;
}
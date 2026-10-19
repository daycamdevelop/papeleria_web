export interface FacturaElectronicaEMission {
    date: string;
    prefix: string;
    resolution_number: number;
    number: string;
    legal_monetary_totals:LegalMonetaryTotals,
    payment_forms: [
        {
            payment_method_code: string;
            payment_form_code: string;
        }
    ],
    tax_totals: TaxTotalsEMission[],
    document_type_code: string;
    currency_type_code: string;
    time: string;
    operation_type_code: string;
    send: boolean;
    invoice_lines: InvoceLinesEMission[],
    customer: {
        address: string;
        identification_number: string;
        identification_type_code: string;
        merchant_registration: string;
        municipality_code: string;
        regime_type_code: string;
        language_code: string;
        country_code: string;
        tax_code: string;
        phone: string;
        name: string;
        organization_type_code: string;
        email: string;
        liability_type_code: string;
        dv?: string;
    }
}

export interface TaxTotalsEMission {
    tax_amount: number;
    tax_code: string;
    percent: number;
    taxable_amount: number;
}

export interface InvoceLinesEMission {
    base_quantity: number;
    code: string;
    free_of_charge_indicator: boolean;
    tax_totals: TaxTotalsEMission[],
    unit_measure_code: string;
    line_extension_amount: number;
    description: string;
    price_amount: number;
    invoiced_quantity: number;
    item_identification_type_code: string;
    allowance_charges?: AllowanceChargesEmission;
}

export interface AllowanceChargesEmission {
    charge_indicator: boolean;
    discount_code: string;
    allowance_charge_reason: string;
    amount: number;
    base_amount: number;
}

export interface LegalMonetaryTotals {
    tax_inclusive_amount: number;
    payable_amount: number;
    line_extension_amount: number;
    charge_total_amount: number;
    tax_exclusive_amount: number;
    allowance_total_amount: number;
}
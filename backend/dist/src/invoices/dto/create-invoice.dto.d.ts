export declare class InvoiceItemDto {
    description: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateInvoiceDto {
    customerId: number;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    items: InvoiceItemDto[];
}

export declare enum InvoiceStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}
export declare class UpdateInvoiceStatusDto {
    status: InvoiceStatus;
}

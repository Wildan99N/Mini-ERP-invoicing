import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(): Promise<{
        totalCustomers: number;
        totalInvoices: number;
        totalRevenue: number;
        pendingAmount: number;
        paidInvoices: number;
        pendingInvoices: number;
        recentInvoices: ({
            customer: {
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            customerId: number;
            invoiceNumber: string;
            date: Date;
            dueDate: Date;
            status: string;
            totalAmount: number;
        })[];
    }>;
}

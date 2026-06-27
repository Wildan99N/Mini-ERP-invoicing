import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
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

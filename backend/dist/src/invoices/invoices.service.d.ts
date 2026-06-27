import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<{
        items: {
            id: number;
            description: string;
            quantity: number;
            unitPrice: number;
            amount: number;
            invoiceId: number;
        }[];
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
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        customer: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
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
    })[]>;
    findOne(id: number): Promise<{
        customer: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
        };
        items: {
            id: number;
            description: string;
            quantity: number;
            unitPrice: number;
            amount: number;
            invoiceId: number;
        }[];
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
    }>;
    updateStatus(id: number, updateStatusDto: UpdateInvoiceStatusDto): import("@prisma/client").Prisma.Prisma__InvoiceClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
        invoiceNumber: string;
        date: Date;
        dueDate: Date;
        status: string;
        totalAmount: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

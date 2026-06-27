import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const totalCustomers = await this.prisma.customer.count();
    const totalInvoices = await this.prisma.invoice.count();
    
    const invoices = await this.prisma.invoice.findMany({
      select: { status: true, totalAmount: true },
    });

    let totalRevenue = 0;
    let pendingAmount = 0;
    let paidInvoices = 0;
    let pendingInvoices = 0;

    invoices.forEach(inv => {
      if (inv.status === 'PAID') {
        totalRevenue += inv.totalAmount;
        paidInvoices++;
      } else if (inv.status === 'PENDING') {
        pendingAmount += inv.totalAmount;
        pendingInvoices++;
      }
    });

    const recentInvoices = await this.prisma.invoice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { customer: { select: { name: true } } },
    });

    return {
      totalCustomers,
      totalInvoices,
      totalRevenue,
      pendingAmount,
      paidInvoices,
      pendingInvoices,
      recentInvoices,
    };
  }
}

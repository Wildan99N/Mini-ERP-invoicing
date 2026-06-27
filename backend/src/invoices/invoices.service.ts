import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    let totalAmount = 0;
    const itemsData = createInvoiceDto.items.map(item => {
      const amount = item.quantity * item.unitPrice;
      totalAmount += amount;
      return { ...item, amount };
    });

    return this.prisma.invoice.create({
      data: {
        invoiceNumber: createInvoiceDto.invoiceNumber,
        date: new Date(createInvoiceDto.date),
        dueDate: new Date(createInvoiceDto.dueDate),
        totalAmount,
        customerId: createInvoiceDto.customerId,
        items: {
          create: itemsData,
        },
      },
      include: {
        items: true,
      }
    });
  }

  findAll() {
    return this.prisma.invoice.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { items: true, customer: true },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  updateStatus(id: number, updateStatusDto: UpdateInvoiceStatusDto) {
    return this.prisma.invoice.update({
      where: { id },
      data: { status: updateStatusDto.status },
    });
  }
}

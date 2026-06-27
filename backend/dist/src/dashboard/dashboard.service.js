"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
            }
            else if (inv.status === 'PENDING') {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
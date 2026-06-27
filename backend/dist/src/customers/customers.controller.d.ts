import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): import("@prisma/client").Prisma.Prisma__CustomerClient<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): import("@prisma/client").Prisma.Prisma__CustomerClient<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__CustomerClient<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

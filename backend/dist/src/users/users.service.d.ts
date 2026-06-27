import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: Prisma.UserCreateInput): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

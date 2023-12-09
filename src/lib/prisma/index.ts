import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

globalForPrisma.prisma ??= new PrismaClient();

export const prisma = globalForPrisma.prisma;

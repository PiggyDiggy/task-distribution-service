import { prisma } from "@/lib/prisma";

export function getScopes() {
  return prisma.scope.findMany();
}

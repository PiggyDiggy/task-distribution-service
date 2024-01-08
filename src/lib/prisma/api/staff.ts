import { Employee } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { methodUnsplashRandomPhoto } from "@/api/staff";

export function getEmployees() {
  return prisma.employee.findMany();
}

export async function createEmployee({ label, name, scopeName }: Employee) {
  const photo = await methodUnsplashRandomPhoto().catch(() => "");

  return prisma.employee.create({
    data: {
      name,
      label,
      photo,
      Scope: {
        connectOrCreate: {
          where: { name: scopeName },
          create: { name: scopeName },
        },
      },
    },
  });
}

export function updateEmployee(id: string, data: Omit<Employee, "id">) {
  return prisma.employee.update({ where: { id }, data });
}

export function deleteEmployee(id: string) {
  return prisma.employee.delete({ where: { id } });
}

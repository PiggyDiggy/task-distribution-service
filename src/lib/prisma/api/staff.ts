import { Employee } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UnsplashResponse = {
  urls: {
    thumb: string;
  };
};

export function getEmployees() {
  return prisma.employee.findMany();
}

async function getUnsplashRandomPhoto() {
  const response = await fetch("https://api.unsplash.com/photos/random", {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}` },
  });

  return ((await response.json()) as UnsplashResponse).urls.thumb;
}

export async function createEmployee({ label, name, scopeName }: Employee) {
  const photo = await getUnsplashRandomPhoto();

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

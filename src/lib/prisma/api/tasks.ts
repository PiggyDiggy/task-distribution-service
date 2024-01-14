import { Task, TaskStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

function getTaskStatus(status?: string) {
  if (!status) {
    return undefined;
  }

  return ["open", "inProgress", "closed"].includes(status) ? status : undefined;
}

export function getTasks(params?: { status?: TaskStatus; executor?: string | null }) {
  return prisma.task.findMany({
    where: {
      status: getTaskStatus(params?.status) as TaskStatus,
      executorId: params?.executor,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export function createTask({ title, value, deadline, description, scopeName }: Task) {
  return prisma.task.create({
    data: {
      title,
      value,
      deadline,
      description,
      Scope: {
        connectOrCreate: {
          where: { name: scopeName },
          create: { name: scopeName },
        },
      },
    },
  });
}

export function updateTask(id: number, data: Omit<Task, "id">) {
  return prisma.task.update({ where: { id }, data });
}

export function deleteTask(id: number) {
  return prisma.task.delete({ where: { id } });
}

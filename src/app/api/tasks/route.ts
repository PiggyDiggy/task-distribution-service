import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { TaskStatus, Task } from "@prisma/client";

import { prisma } from "@/lib/prisma";

function getTaskStatus(status: string | null) {
  if (!status) {
    return undefined;
  }

  return ["open", "inProgress", "closed"].includes(status) ? status : undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tasks = await prisma.task.findMany({
    where: {
      status: getTaskStatus(searchParams.get("status")) as TaskStatus,
      executorId: searchParams.get("executor") ?? undefined,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const { title, value, deadline, description, scopeName }: Task = await request.json();

    const created = await prisma.task.create({
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
    revalidateTag("tasks");
    revalidateTag("scope");
    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

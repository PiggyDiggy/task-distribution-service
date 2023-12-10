import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { TaskStatus, Task } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { Optional } from "@/types";

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
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const task: Optional<Task, "id"> = await request.json();

  try {
    delete task.id;
    const created = await prisma.task.create({ data: task });
    revalidateTag("tasks");
    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

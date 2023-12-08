import { NextRequest, NextResponse } from "next/server";
import { TaskStatus, PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tasks = await prisma.task.findMany({
    where: {
      status: (searchParams.get("status") as TaskStatus) ?? undefined,
      executorId: searchParams.get("executor") ?? undefined,
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const task: Task = await request.json();

  const created = await prisma.task.create({ data: task });
  return NextResponse.json(created);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const deleted = await prisma.task.delete({ where: { id: Number(id) } });
  return NextResponse.json(deleted);
}

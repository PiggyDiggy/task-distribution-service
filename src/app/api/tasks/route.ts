import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@prisma/client";

import { createTask, getTasks } from "@/lib/prisma/api/tasks";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const paramsObject = Object.fromEntries(searchParams);

  return NextResponse.json(await getTasks(paramsObject));
}

export async function POST(request: NextRequest) {
  try {
    const task: Task = await request.json();
    const created = await createTask(task);

    revalidateTag("tasks");
    revalidateTag("scope");

    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

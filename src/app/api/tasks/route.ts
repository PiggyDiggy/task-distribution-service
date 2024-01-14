import { NextRequest, NextResponse } from "next/server";
import { Task } from "@prisma/client";

import { createTask, getTasks } from "@/lib/prisma/api/tasks";
import { getParamsObject } from "@/lib/utils";
import { revalidateCache } from "@/api/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const paramsObject = getParamsObject(searchParams);

  return NextResponse.json(await getTasks(paramsObject));
}

export async function POST(request: NextRequest) {
  try {
    const task: Task = await request.json();
    const created = await createTask(task);

    revalidateCache({ tags: ["tasks", "scope"], paths: ["/"] });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

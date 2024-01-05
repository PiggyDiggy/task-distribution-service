import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@prisma/client";

import { deleteTask, updateTask } from "@/lib/prisma/api/tasks";

type Params = { params: { id: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id, ...data }: Task = await request.json();
    const updated = await updateTask(Number(params.id), data);
    revalidateTag("tasks");
    return NextResponse.json(updated);
  } catch (e: any) {
    if (e.code === "P2025") {
      return new NextResponse("No task with given id found", { status: 404 });
    }
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await deleteTask(Number(params.id));
    revalidateTag("tasks");
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Task with provided id doesn't exist", { status: 404 });
  }
}

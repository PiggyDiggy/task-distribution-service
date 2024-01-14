import { NextRequest, NextResponse } from "next/server";
import { Task } from "@prisma/client";

import { deleteTask, updateTask } from "@/lib/prisma/api/tasks";
import { revalidateCache } from "@/api/utils";

type Params = { params: { id: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id, ...data }: Task = await request.json();
    const updated = await updateTask(Number(params.id), data);
    revalidateCache({ tags: ["tasks"], paths: ["/"] });
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
    revalidateCache({ tags: ["tasks"], paths: ["/"] });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Task with provided id doesn't exist", { status: 404 });
  }
}

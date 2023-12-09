import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  const data: Partial<Employee> = await request.json();

  try {
    const updated = await prisma.employee.update({ where: { id: params.id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    if (e.code === "P2025") {
      return new NextResponse("No employee with given id found", { status: 404 });
    }
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await prisma.employee.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Employee with provided id doesn't exist", { status: 404 });
  }
}

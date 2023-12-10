import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { Optional } from "@/types";

export async function GET() {
  return NextResponse.json(await prisma.employee.findMany());
}

export async function POST(request: NextRequest) {
  const employee: Optional<Employee, "id"> = await request.json();

  try {
    delete employee.id;
    const created = await prisma.employee.create({ data: employee });
    revalidateTag("staff");
    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

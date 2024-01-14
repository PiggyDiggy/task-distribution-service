import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@prisma/client";

import { createEmployee, getEmployees } from "@/lib/prisma/api/staff";
import { revalidateCache } from "@/api/utils";

export async function GET() {
  return NextResponse.json(await getEmployees());
}

export async function POST(request: NextRequest) {
  try {
    const employee: Employee = await request.json();
    const created = await createEmployee(employee);

    revalidateCache({ tags: ["staff", "scope"], paths: ["/"] });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

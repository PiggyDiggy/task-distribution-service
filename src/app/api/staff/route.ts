import { NextRequest, NextResponse } from "next/server";
import { Employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json(await prisma.employee.findMany());
}

export async function POST(request: NextRequest) {
  const employee: Employee = await request.json();

  const created = await prisma.employee.create({ data: employee });
  return NextResponse.json(created);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const deleted = await prisma.employee.delete({ where: { id } });
  return NextResponse.json(deleted);
}

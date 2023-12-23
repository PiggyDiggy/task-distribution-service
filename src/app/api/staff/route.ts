import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.employee.findMany());
}

export async function POST(request: NextRequest) {
  try {
    const { label, photo, name, scopeName }: Employee = await request.json();

    const created = await prisma.employee.create({
      data: {
        name,
        label,
        photo,
        Scope: {
          connectOrCreate: {
            where: { name: scopeName },
            create: { name: scopeName },
          },
        },
      },
    });
    revalidateTag("staff");
    revalidateTag("scope");
    return NextResponse.json(created, { status: 201 });
  } catch {
    return new NextResponse("Invalid data provided", { status: 400 });
  }
}

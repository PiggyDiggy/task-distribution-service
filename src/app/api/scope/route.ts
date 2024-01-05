import { NextResponse } from "next/server";

import { getScopes } from "@/lib/prisma/api/scope";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getScopes());
}

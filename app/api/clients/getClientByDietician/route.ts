import { checkValidToken } from "@/lib/checkValidToken";
import { prisma } from "@/lib/prisma";
import { Client } from "@/lib/Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isValid = await checkValidToken(req);
  if (!isValid) {
    return NextResponse.json("Invalid token", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { searchParams } = new URL(req.url);
  const trainer = searchParams.get("trainer");

  if (!trainer) {
    return NextResponse.json(
      { error: "Missing trainer parameter" },
      { status: 400 }
    );
  }

  const clients: Client[] = await prisma.client.findMany({
    where: { createdBy: Number(trainer) },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(clients, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

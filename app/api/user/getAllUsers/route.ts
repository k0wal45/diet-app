import { NextResponse } from "next/server";
// In API route or server action
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();

  console.log("Retrieved users:", users);

  if (!users) {
    return NextResponse.json("Failed to retrieve users", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.json(users, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

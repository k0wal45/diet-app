import { NextRequest, NextResponse } from "next/server";
// In API route or server action
import { prisma } from "@/lib/prisma";
import { checkValidToken } from "@/lib/checkValidToken";

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

  try {
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

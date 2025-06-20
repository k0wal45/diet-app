import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// In API route or server action
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const user = await req.json();

  console.log("Received user data:", user);

  const newUser = await prisma.user.create({
    data: {
      email: "anna@example.com",
      name: "Anna",
      meals: {
        create: [
          { name: "Breakfast", calories: 300 },
          { name: "Lunch", calories: 500 },
        ],
      },
    },
    include: {
      meals: true,
    },
  });

  console.log("New user created:", newUser);
  if (!newUser) {
    return NextResponse.json("Failed to add user", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return NextResponse.json("User added successfully", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

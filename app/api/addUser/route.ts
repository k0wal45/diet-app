import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const user = await req.json();

  console.log("Received user data:", user);

  if (!user.email || !user.name || !user.password) {
    return NextResponse.json("Missing required fields", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const hashedPassword = user.password; // Replace with actual hashing logic

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: hashedPassword,
      clients: [],
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

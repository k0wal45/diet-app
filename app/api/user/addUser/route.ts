import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const user = await req.json();

  if (!user.email || !user.name || !user.password || !user.role) {
    return NextResponse.json("Email, name, role and password are required", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const saltRounds = Number(process.env.HASH_SALT);
  if (!saltRounds || isNaN(saltRounds)) {
    return NextResponse.json(
      "Server configuration error: HASH_SALT is not set or not a number",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      role: user.role,
      password: hashedPassword,
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

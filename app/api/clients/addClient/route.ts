import { NextRequest, NextResponse } from "next/server";
import { checkValidToken } from "@/lib/checkValidToken";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const isValid = await checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  const body = await req.json();

  const { name, email, age, weight, height, sex, trainerId } = body;

  if (!name && !email && !age && !weight && !height && !sex && !trainerId) {
    return NextResponse.json({
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  console.log(body);

  const newClient = await prisma.client.create({
    data: {
      name,
      email,
      age: parseInt(age),
      weight: parseInt(weight),
      height: parseInt(weight),
      sex,
      createdBy: trainerId,
    },
  });

  console.log("New client created: ", newClient);

  return NextResponse.json({
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

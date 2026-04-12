import { NextRequest, NextResponse } from "next/server";
import { checkValidToken } from "@/lib/checkValidToken";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function POST(req: NextRequest) {
  try {
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

    const existingClient = await prisma.client.findUnique({
      where: { email },
    });

    if (existingClient) {
      return NextResponse.json({
        success: false,
        body: "Client with this email already exists",
        status: 409,
      });
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
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
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      {
        success: false,
        body: "Internal server error",
      },
      { status: 500 },
    );
  }
}

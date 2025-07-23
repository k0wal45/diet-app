import { NextRequest, NextResponse } from "next/server";
import { checkValidToken } from "@/lib/checkValidToken";

export async function POST(req: NextRequest) {
  const isValid = await checkValidToken(req);
  console.log(isValid);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }
  // If the token is valid, proceed with the request
  const body = await req.json();

  const { name, email, age, weight, height, sex } = body;

  if (!name && !email && !age && !weight && !height && !sex) {
    return NextResponse.json({
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.json({
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

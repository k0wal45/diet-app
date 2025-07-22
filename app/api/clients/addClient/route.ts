import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, email, age, weight, height, sex } = body;

  if (!name && !email && !age && !weight && !height && !sex) {
  }

  return new Response(
    JSON.stringify({ message: "Client added successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkValidToken } from "@/lib/checkValidToken";

export async function POST(req: NextRequest) {
  const isValid = await checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }

  try {
    const {
      name,
      description,
      category,
      protein,
      fat,
      carbs,
      kcal,
      unit,
      amount,
    } = await req.json();

    if (
      !name &&
      !description &&
      !category &&
      !protein &&
      !fat &&
      !carbs &&
      !kcal &&
      !unit &&
      !amount
    ) {
      throw new Error("Invalid data");
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        category,
        protein: parseFloat(protein),
        fat: parseFloat(fat),
        carbs: parseFloat(carbs),
        kcal: parseFloat(kcal),
        unit,
        amount: parseFloat(amount),
      },
    });

    console.log("New product: ", newProduct);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 401 });
  }
}

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkValidToken } from "@/lib/checkValidToken";
import { MealProduct } from "@/lib/Types";

export async function POST(req: NextRequest) {
  const isValid = await checkValidToken(req);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      body: "Invalid token",
    });
  }

  try {
    const { name, description, mealProducts } = await req.json();

    const newMeal = await prisma.meal.create({
      data: {
        name: name,
        description: description,
        mealProducts: {
          create: mealProducts.map((item: MealProduct) => ({
            quantity: item.quantity,
            product: {
              connect: { id: item.productId },
            },
          })),
        },
      },
      include: {
        mealProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, newMeal }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 401 });
  }
}

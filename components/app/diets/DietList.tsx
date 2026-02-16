"use client";
import React, { useState } from "react";
import ListItem from "./ListItem";
import { FaArrowDown } from "react-icons/fa";
import { Client, Diet, Product } from "@/lib/Types";

const groupDiets = (diets: Diet[]): GroupedDiet[] => {
  return diets.reduce((acc, diet) => {
    const existingGroup = acc.find(
      (group) => group.client.id === diet.clientId,
    );

    if (existingGroup) {
      existingGroup.diets.push(diet);
    } else {
      acc.push({
        client: diet.client!,
        diets: [diet],
      });
    }

    return acc;
  }, [] as GroupedDiet[]);
};

const DietList = () => {
  const [showDiets, setShowDiets] = useState<number[]>([]);
  const mockGroupedDiets: GroupedDiet[] = groupDiets(mockDiets);

  return (
    <div className="flex flex-col gap-8 w-full">
      {mockGroupedDiets.map((item: GroupedDiet) => (
        <div key={item.client.id} className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4 p-4 rounded-xl shadow-xl w-full">
            <p className="text-xl font-semibold">{item.client.name}</p>
            <ul className="flex items-center justify-between gap-4">
              <li>Age: {item.client.age}</li>
              <li>Weight: {item.client.weight} kg</li>
              <li>Height: {item.client.height} cm</li>
              <li>Sex: {item.client.sex}</li>
              <li
                onClick={() =>
                  setShowDiets((prev) =>
                    prev.includes(item.client.id)
                      ? prev.filter((id) => id !== item.client.id)
                      : [...prev, item.client.id],
                  )
                }
              >
                <FaArrowDown
                  className="text-2xl text-neutral-500 hover:text-neutral-700 duration-100 active:scale-90"
                  style={{
                    transform: showDiets.includes(item.client.id)
                      ? ""
                      : "rotate(90deg)",
                  }}
                />
              </li>
            </ul>
          </div>
          <div
            className="flex flex-col gap-8"
            style={{
              display: showDiets.includes(item.client.id) ? "flex" : "none",
            }}
          >
            {item.diets.map((diet: Diet) => (
              <ListItem key={diet.id} diet={diet} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DietList;
interface GroupedDiet {
  client: Client;
  diets: Diet[];
}
// --- MOCK DATA ---

const products = {
  chickenBreast: {
    id: 1,
    name: "Pierś z kurczaka",
    category: "MEAT",
    protein: 21.5,
    fat: 1.3,
    carbs: 0,
    kcal: 99,
    unit: "G",
    amount: 100,
  } as Product,
  riceWhite: {
    id: 2,
    name: "Ryż biały",
    category: "MEAT",
    protein: 2.7,
    fat: 0.3,
    carbs: 77,
    kcal: 344,
    unit: "G",
    amount: 100,
  } as Product,
  oliveOil: {
    id: 3,
    name: "Oliwa z oliwek",
    category: "MEAT",
    protein: 0,
    fat: 100,
    carbs: 0,
    kcal: 884,
    unit: "ML",
    amount: 100,
  } as Product,
  broccoli: {
    id: 4,
    name: "Brokuły",
    category: "MEAT",
    protein: 2.8,
    fat: 0.4,
    carbs: 7,
    kcal: 34,
    unit: "G",
    amount: 100,
  } as Product,
  eggs: {
    id: 5,
    name: "Jajko Kurze (L)",
    category: "MEAT",
    protein: 12.5,
    fat: 9.7,
    carbs: 0.6,
    kcal: 140,
    unit: "SLICE",
    amount: 100,
  } as Product, // amount 100 tutaj to umowna waga lub przelicznik na sztuki
  oats: {
    id: 6,
    name: "Płatki owsiane",
    category: "MEAT",
    protein: 13,
    fat: 7,
    carbs: 66,
    kcal: 370,
    unit: "G",
    amount: 100,
  } as Product,
  wheyProtein: {
    id: 7,
    name: "Odżywka Białkowa (WPC)",
    category: "MEAT",
    protein: 78,
    fat: 6,
    carbs: 5,
    kcal: 390,
    unit: "G",
    amount: 100,
  } as Product,
  avocado: {
    id: 8,
    name: "Awokado",
    category: "MEAT",
    protein: 2,
    fat: 15,
    carbs: 9,
    kcal: 160,
    unit: "G",
    amount: 100,
  } as Product,
  salmon: {
    id: 9,
    name: "Łosoś świeży",
    category: "MEAT",
    protein: 20,
    fat: 13,
    carbs: 0,
    kcal: 200,
    unit: "G",
    amount: 100,
  } as Product,
  potato: {
    id: 10,
    name: "Ziemniaki",
    category: "MEAT",
    protein: 2,
    fat: 0.1,
    carbs: 17,
    kcal: 77,
    unit: "G",
    amount: 100,
  } as Product,
  beef: {
    id: 11,
    name: "Wołowina (udziec)",
    category: "MEAT",
    protein: 26,
    fat: 15,
    carbs: 0,
    kcal: 250,
    unit: "G",
    amount: 100,
  } as Product,
  spinach: {
    id: 12,
    name: "Szpinak świeży",
    category: "GREENS",
    protein: 2.9,
    fat: 0.4,
    carbs: 3.6,
    kcal: 23,
    unit: "G",
    amount: 100,
  } as Product,
};

export const mockDiets: Diet[] = [
  {
    id: 1,
    name: "Redukcja - Start",
    description:
      "Początkowy etap redukcji, umiarkowany deficyt, wysokie białko.",
    saved: true,
    createdAt: "2023-10-25T10:00:00Z",
    clientId: 101,
    client: {
      id: 101,
      name: "Michał Kowalski",
      age: 28,
      weight: 92.5,
      height: 182,
      sex: "MALE",
      activityFactor: 1.55,
      createdBy: 0,
    },
    dietMeals: [
      {
        id: 1001,
        dietId: 1,
        mealId: 101,
        meal: {
          id: 101,
          name: "Jajecznica na parze ze szczypiorkiem",
          description: "Lekkie śniadanie białkowe",
          createdAt: "2023-10-25T08:00:00Z",
          mealProducts: [
            {
              id: 1,
              mealId: 101,
              productId: 5,
              quantity: 10,
              product: products.eggs,
            }, // 3 jajka
            {
              id: 2,
              mealId: 101,
              productId: 3,
              quantity: 5,
              product: products.oliveOil,
            }, // 5ml oliwy
            {
              id: 3,
              mealId: 101,
              productId: 12,
              quantity: 50,
              product: products.spinach,
            }, // 50g szpinaku
          ],
        },
      },
      {
        id: 1002,
        dietId: 1,
        mealId: 102,
        meal: {
          id: 102,
          name: "Pierś z kurczaka z kaszą i brokułami",
          description: "Klasyczny posiłek obiadowy",
          createdAt: "2023-10-25T08:00:00Z",
          mealProducts: [
            {
              id: 4,
              mealId: 102,
              productId: 1,
              quantity: 200,
              product: products.chickenBreast,
            }, // 200g kurczaka
            {
              id: 5,
              mealId: 102,
              productId: 2,
              quantity: 75,
              product: products.riceWhite,
            }, // 75g ryżu (zamiast kaszy w mocku)
            {
              id: 6,
              mealId: 102,
              productId: 4,
              quantity: 150,
              product: products.broccoli,
            }, // 150g brokuł
            {
              id: 7,
              mealId: 102,
              productId: 3,
              quantity: 10,
              product: products.oliveOil,
            }, // 10ml oliwy
          ],
        },
      },
      {
        id: 1003,
        dietId: 1,
        mealId: 103,
        meal: {
          id: 103,
          name: "Twaróg z orzechami (Keto Style)",
          description: "Kolacja",
          createdAt: "2023-10-25T08:00:00Z",
          mealProducts: [
            // Uproszczony mock produktów dla twarogu
            {
              id: 8,
              mealId: 103,
              productId: 7,
              quantity: 30,
              product: products.wheyProtein,
            },
            {
              id: 9,
              mealId: 103,
              productId: 8,
              quantity: 50,
              product: products.avocado,
            },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    name: "Masa - Cykl 1",
    description: "Nadwyżka kaloryczna +300kcal. Trening siłowy 4x w tygodniu.",
    saved: false,
    createdAt: "2023-11-10T09:00:00Z",
    clientId: 101,
    client: {
      id: 101,
      name: "Michał Kowalski",
      age: 28,
      weight: 92.5,
      height: 182,
      sex: "MALE",
      activityFactor: 1.55,
      createdBy: 0,
    },
    dietMeals: [
      {
        id: 2001,
        dietId: 2,
        mealId: 201,
        meal: {
          id: 201,
          name: "Owsianka Królewska (Masa)",
          description: "Wysokowęglowodanowe śniadanie",
          createdAt: "2023-11-10T08:00:00Z",
          mealProducts: [
            {
              id: 10,
              mealId: 201,
              productId: 6,
              quantity: 100,
              product: products.oats,
            }, // 100g owsianki
            {
              id: 11,
              mealId: 201,
              productId: 7,
              quantity: 40,
              product: products.wheyProtein,
            }, // 40g białka
            {
              id: 12,
              mealId: 201,
              productId: 8,
              quantity: 50,
              product: products.avocado,
            }, // Tłuszcze
          ],
        },
      },
      {
        id: 2002,
        dietId: 2,
        mealId: 202,
        meal: {
          id: 202,
          name: "Stek wołowy z ziemniakami",
          description: "Solidna porcja kreatyny i żelaza",
          createdAt: "2023-11-10T08:00:00Z",
          mealProducts: [
            {
              id: 13,
              mealId: 202,
              productId: 11,
              quantity: 250,
              product: products.beef,
            }, // 250g wołowiny
            {
              id: 14,
              mealId: 202,
              productId: 10,
              quantity: 400,
              product: products.potato,
            }, // 400g ziemniaków
            {
              id: 15,
              mealId: 202,
              productId: 4,
              quantity: 200,
              product: products.broccoli,
            }, // 200g warzyw
          ],
        },
      },
    ],
  },
  {
    id: 7,
    name: "Keto Adaptacja",
    description: "Wysokie tłuszcze, wejście w stan ketozy. Węgle < 30g.",
    saved: false,
    createdAt: "2023-09-15T16:00:00Z",
    clientId: 103,
    client: {
      id: 103,
      name: "Robert Dziki",
      age: 41,
      weight: 88.0,
      height: 178,
      sex: "MALE",
      activityFactor: 1.725,
      createdBy: 0,
    },
    dietMeals: [
      {
        id: 7001,
        dietId: 7,
        mealId: 701,
        meal: {
          id: 701,
          name: "Jajka na boczku (Keto)",
          description: "Klasyk",
          createdAt: "2023-09-15T08:00:00Z",
          mealProducts: [
            {
              id: 20,
              mealId: 701,
              productId: 5,
              quantity: 4,
              product: products.eggs,
            }, // 4 jajka
            {
              id: 21,
              mealId: 701,
              productId: 3,
              quantity: 15,
              product: products.oliveOil,
            }, // Oliwa/Smalec
          ],
        },
      },
      {
        id: 7002,
        dietId: 7,
        mealId: 702,
        meal: {
          id: 702,
          name: "Łosoś pieczony z awokado",
          description: "Tłusty obiad",
          createdAt: "2023-09-15T08:00:00Z",
          mealProducts: [
            {
              id: 22,
              mealId: 702,
              productId: 9,
              quantity: 200,
              product: products.salmon,
            }, // 200g łososia
            {
              id: 23,
              mealId: 702,
              productId: 8,
              quantity: 150,
              product: products.avocado,
            }, // 150g awokado
            {
              id: 24,
              mealId: 702,
              productId: 12,
              quantity: 100,
              product: products.spinach,
            }, // Szpinak
          ],
        },
      },
    ],
  },
];

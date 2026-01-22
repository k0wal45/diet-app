import React from "react";
import ListItem from "./ListItem";

const groupDiets = (diets: Diet[]): GroupedDiet[] => {
  return diets.reduce((acc, diet) => {
    const existingGroup = acc.find(
      (group) => group.client.id === diet.clientId,
    );

    if (existingGroup) {
      existingGroup.diets.push(diet);
    } else {
      acc.push({
        client: diet.client,
        diets: [diet],
      });
    }

    return acc;
  }, [] as GroupedDiet[]);
};

const DietList = () => {
  const mockGroupedDiets: GroupedDiet[] = groupDiets(mockDiets);

  console.log(mockGroupedDiets);

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
            </ul>
          </div>
          {item.diets.map((diet: Diet) => (
            <ListItem key={diet.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DietList;
// Opcjonalnie typy, jeśli potrzebujesz
type Sex = "MALE" | "FEMALE";

interface Client {
  id: number;
  name: string;
  age: number;
  weight: number;
  height: number;
  sex: Sex;
  activityFactor: number;
}

interface Diet {
  id: number;
  name: string;
  description: string | null;
  saved: boolean;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  createdAt: string;
  clientId: number;
  client: Client;
  dietMeals: any[]; // Puste pole, bo nie jest wymagane w widoku listy
}

interface GroupedDiet {
  client: Client;
  diets: Diet[];
}
// --- DANE ---
export const mockDiets: Diet[] = [
  // --- KLIENT 1: Michał Kowalski (Cel: Budowa sylwetki) ---
  {
    id: 1,
    name: "Redukcja - Start",
    description:
      "Początkowy etap redukcji, umiarkowany deficyt, wysokie białko.",
    saved: true,
    kcal: 2250,
    protein: 180,
    fat: 70,
    carbs: 210,
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
    },
    dietMeals: [],
  },
  {
    id: 2,
    name: "Masa - Cykl 1",
    description: "Nadwyżka kaloryczna +300kcal. Trening siłowy 4x w tygodniu.",
    saved: false,
    kcal: 3100,
    protein: 200,
    fat: 90,
    carbs: 380,
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
    },
    dietMeals: [],
  },
  {
    id: 3,
    name: "Low Carb - Odpoczynek",
    description: "Dieta na dni beztreningowe. Zmniejszona ilość węglowodanów.",
    saved: false,
    kcal: 2400,
    protein: 190,
    fat: 100,
    carbs: 100,
    createdAt: "2023-11-15T12:00:00Z",
    clientId: 101,
    client: {
      id: 101,
      name: "Michał Kowalski",
      age: 28,
      weight: 92.5,
      height: 182,
      sex: "MALE",
      activityFactor: 1.55,
    },
    dietMeals: [],
  },

  // --- KLIENT 2: Anna Nowak (Cel: Zdrowie i Hashimoto) ---
  {
    id: 4,
    name: "Protokół Autoimmunologiczny",
    description: "Eliminacja glutenu i nabiału. Skupienie na jelitach.",
    saved: true,
    kcal: 1800,
    protein: 110,
    fat: 80,
    carbs: 160,
    createdAt: "2023-10-01T08:30:00Z",
    clientId: 102,
    client: {
      id: 102,
      name: "Anna Nowak",
      age: 34,
      weight: 68.0,
      height: 165,
      sex: "FEMALE",
      activityFactor: 1.375,
    },
    dietMeals: [],
  },
  {
    id: 5,
    name: "Dieta Śródziemnomorska",
    description: "Dużo ryb, oliwy z oliwek i warzyw. Balans hormonalny.",
    saved: true,
    kcal: 1950,
    protein: 100,
    fat: 95,
    carbs: 180,
    createdAt: "2023-10-20T14:00:00Z",
    clientId: 102,
    client: {
      id: 102,
      name: "Anna Nowak",
      age: 34,
      weight: 68.0,
      height: 165,
      sex: "FEMALE",
      activityFactor: 1.375,
    },
    dietMeals: [],
  },
  {
    id: 6,
    name: "Detoks cukrowy",
    description: "Tydzień bez przetworzonego cukru. Tylko owoce.",
    saved: false,
    kcal: 1600,
    protein: 90,
    fat: 60,
    carbs: 150,
    createdAt: "2023-11-05T11:15:00Z",
    clientId: 102,
    client: {
      id: 102,
      name: "Anna Nowak",
      age: 34,
      weight: 68.0,
      height: 165,
      sex: "FEMALE",
      activityFactor: 1.375,
    },
    dietMeals: [],
  },

  // --- KLIENT 3: Robert "Dziki" (Cel: Wytrzymałość i Keto) ---
  {
    id: 7,
    name: "Keto Adaptacja",
    description: "Wysokie tłuszcze, wejście w stan ketozy. Węgle < 30g.",
    saved: false,
    kcal: 2600,
    protein: 140,
    fat: 210,
    carbs: 25,
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
    },
    dietMeals: [],
  },
  {
    id: 8,
    name: "Targeted Keto (TKD)",
    description: "Ładowanie węglowodanami tylko okołotreningowo.",
    saved: true,
    kcal: 2800,
    protein: 160,
    fat: 190,
    carbs: 80,
    createdAt: "2023-10-10T10:00:00Z",
    clientId: 103,
    client: {
      id: 103,
      name: "Robert Dziki",
      age: 41,
      weight: 88.0,
      height: 178,
      sex: "MALE",
      activityFactor: 1.725,
    },
    dietMeals: [],
  },
  {
    id: 9,
    name: "Post przerywany 16/8",
    description: "Okno żywieniowe 12:00 - 20:00. Dwa duże posiłki.",
    saved: false,
    kcal: 2500,
    protein: 180,
    fat: 120,
    carbs: 160,
    createdAt: "2023-11-01T18:00:00Z",
    clientId: 103,
    client: {
      id: 103,
      name: "Robert Dziki",
      age: 41,
      weight: 88.0,
      height: 178,
      sex: "MALE",
      activityFactor: 1.725,
    },
    dietMeals: [],
  },
];

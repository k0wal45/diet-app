import { Client } from "./Types";

export function calculateDiet(client: Client) {
  // 1. Obliczenie BMR (Basal Metabolic Rate) - Wzór Mifflina-St Jeora
  // Dla MĘŻCZYZN: (10 x waga) + (6.25 x wzrost) - (5 x wiek) + 5
  // Dla KOBIET:   (10 x waga) + (6.25 x wzrost) - (5 x wiek) - 161
  let bmr;

  if (client.sex === "MALE") {
    bmr = 10 * client.weight! + 6.25 * client.height! - 5 * client.age! + 5;
  } else {
    bmr = 10 * client.weight! + 6.25 * client.height! - 5 * client.age! - 161;
  }

  // 2. Obliczenie TDEE (Total Daily Energy Expenditure) - Całkowite zapotrzebowanie
  const tdee = Math.round(bmr * client.activityFactor);

  // 3. Obliczenie Makroskładników
  // Założenia: Białko 2g/kg, Tłuszcze 1g/kg, Reszta to Węglowodany.
  // Kaloryczność: 1g Białka = 4 kcal, 1g Tłuszczu = 9 kcal, 1g Węglowodanów = 4 kcal

  const proteinGrams = Math.round(client.weight! * 2.0); // 2g na kg masy ciała
  const fatGrams = Math.round(client.weight! * 1.0); // 1g na kg masy ciała

  const caloriesFromProtein = proteinGrams * 4;
  const caloriesFromFat = fatGrams * 9;

  // Obliczamy ile kalorii zostało na węglowodany
  const remainingCalories = tdee - (caloriesFromProtein + caloriesFromFat);
  const carbsGrams = Math.round(remainingCalories / 4);

  // Zwracamy wynik
  return {
    dailyCalories: tdee,
    macros: {
      protein: {
        grams: proteinGrams,
        calories: caloriesFromProtein,
      },
      fats: {
        grams: fatGrams,
        calories: caloriesFromFat,
      },
      carbs: {
        grams: carbsGrams,
        calories: remainingCalories,
      },
    },
    meta: {
      bmr: Math.round(bmr),
      clientName: client.name,
    },
  };
}

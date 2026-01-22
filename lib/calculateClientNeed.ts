import { Client } from "./Types";

// Główna funkcja obliczająca
export const calculateClientNeeds = (client: Client) => {
  // 1. Walidacja danych (bo w bazie masz Int? i Float?)
  if (!client.weight || !client.height || !client.age) {
    console.warn(`Klient ${client.name} ma niekompletne dane.`);
    return null;
  }

  const { weight, height, age, sex } = client;

  // 2. Wzór Mifflina-St Jeora
  // BMR = (10 x waga kg) + (6.25 x wzrost cm) - (5 x wiek lat) + S
  // S = +5 dla mężczyzn, -161 dla kobiet

  let bmr = 10 * weight + 6.25 * height - 5 * age;

  if (sex === "MALE") {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const tdee = bmr * client.activityFactor;

  return {
    bmr: Math.round(bmr), // Podstawowa przemiana (kcal na przeżycie)
    tdee: Math.round(tdee), // Całkowita przemiana (ile jeść, żeby utrzymać wagę)
  };
};

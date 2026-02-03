// types.ts

export type Sex = "MALE" | "FEMALE";

export type UserRole = "ADMIN" | "DIETICIAN" | "USER";

export type Unit = "G" | "ML" | "SLICE";

export type ProductCategory =
  | "MEAT"
  | "FISH"
  | "DAIRY"
  | "FRUITS"
  | "VEGETABLES"
  | "BREAD"
  | "COOKING"
  | "LEGUMES"
  | "SPICES"
  | "GRAINS"
  | "GREENS"
  | "OTHER"
  | "SUPPLEMENTS";

// Model: User
export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  clients?: Client[];
}

// Model: Client
export interface Client {
  id: number;
  name: string;
  email?: string | null;
  age?: number | null;
  weight?: number | null;
  height?: number | null;
  sex: Sex;
  createdBy: number;
  activityFactor: number;
  trainer?: User;
  diets?: Diet[];
}

// Model: Product

export interface Product {
  id: number;
  name: string;
  description?: string;
  category: ProductCategory;
  protein: number;
  fat: number;
  carbs: number;
  kcal: number;
  unit: Unit;
  amount: number; // Ilość bazowa dla makro (np. 100g)
  createdAt?: string;
}

export interface MealProduct {
  id: number;
  mealId: number;
  productId: number;
  quantity: number; // Ilość faktycznie użyta w posiłku (np. 150g)
  product: Product; // Zagnieżdżony produkt (Relacja)
}

export interface Meal {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  mealProducts: MealProduct[]; // Posiłek składa się z produktów
  dietMeals?: DietMeal[];
}

export interface DietMeal {
  id: number;
  dietId: number;
  mealId: number;
  meal: Meal; // Zagnieżdżony posiłek
}

export interface Diet {
  id: number;
  name: string;
  description?: string;
  saved: boolean;
  // Pola makro usunięte - będą liczone dynamicznie w UI na podstawie klienta lub posiłków
  createdAt: string;
  clientId: number;
  client: Client;
  dietMeals: DietMeal[]; // Relacja Dieta -> Posiłki
}

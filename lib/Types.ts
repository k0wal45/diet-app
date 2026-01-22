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
  description?: string | null;
  category: ProductCategory;
  protein: number;
  fat: number;
  carbs: number;
  kcal: number;
  unit: Unit;
  amount: number;
  createdAt: Date;
  mealProducts?: MealProduct[];
}

// Model: Meal
export interface Meal {
  id: number;
  name: string;
  description?: string | null;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  createdAt: Date;
  mealProducts?: MealProduct[];
  dietMeals?: DietMeal[];
}

// Model: MealProduct
export interface MealProduct {
  id: number;
  mealId: number;
  productId: number;
  quantity: number;
  meal?: Meal;
  product?: Product;
}

// Model: Diet
export interface Diet {
  id: number;
  name: string;
  description?: string | null;
  saved: boolean;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  createdAt: Date;
  clientId?: number | null;
  client?: Client | null;
  dietMeals?: DietMeal[];
}

// Model: DietMeal
export interface DietMeal {
  id: number;
  dietId: number;
  mealId: number;
  diet?: Diet;
  meal?: Meal;
}

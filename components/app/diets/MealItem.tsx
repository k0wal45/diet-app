import { Meal, MealProduct } from "@/lib/Types";
import React from "react";

const calculateCalories = (meal: Meal) => {
  const makros = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  makros.kcal = Math.round(
    meal.mealProducts.reduce(
      (acc: number, item: MealProduct) =>
        acc +
        item.product.kcal *
          (item.product.unit === "SLICE" ? item.quantity : item.quantity / 100),
      0,
    ),
  );

  makros.protein = Math.round(
    meal.mealProducts.reduce(
      (acc: number, item: MealProduct) =>
        acc +
        item.product.protein *
          (item.product.unit === "SLICE" ? item.quantity : item.quantity / 100),
      0,
    ),
  );

  makros.carbs = Math.round(
    meal.mealProducts.reduce(
      (acc: number, item: MealProduct) =>
        acc +
        item.product.carbs *
          (item.product.unit === "SLICE" ? item.quantity : item.quantity / 100),
      0,
    ),
  );

  makros.fats = Math.round(
    meal.mealProducts.reduce(
      (acc: number, item: MealProduct) =>
        acc +
        item.product.fat *
          (item.product.unit === "SLICE" ? item.quantity : item.quantity / 100),
      0,
    ),
  );

  return makros;
};

const MealItem = ({ meal }: { meal: Meal }) => {
  const makros = calculateCalories(meal);

  return (
    <div className="flex flex-col py-4 rounded-xl bg-white gap-2">
      <div className="flex gap-4 justify-between px-4">
        <p className="text-lg font-semibold">{meal.name}</p>
        <p className="text-lg">kcal: {Math.round(makros.kcal)}</p>
      </div>
      <ul className="flex justify-between gap-4 px-4">
        <li>Protein: {makros.protein}</li>
        <li>Fat: {makros.fats}</li>
        <li>Carb: {makros.carbs}</li>
      </ul>

      {meal.mealProducts.map((product: MealProduct, index: number) => (
        <ul
          className={`grid grid-cols-5 p-4 ${
            index % 2 == 0 ? "bg-neutral-50" : ""
          }`}
          key={product.id}
        >
          <li className="flex gap-1">{product.product.name}</li>
          <li className="flex gap-1">
            <span className="block text-neutral-600">P</span>
            {product.product.protein}
            <span className="block text-neutral-600">g</span>
          </li>
          <li className="flex gap-1">
            <span className="block text-neutral-600">F</span>
            {product.product.fat}
            <span className="block text-neutral-600">g</span>
          </li>
          <li className="flex gap-1">
            <span className="block text-neutral-600">C</span>
            {product.product.carbs}
            <span className="block text-neutral-600">g</span>
          </li>
          <li className="flex gap-1">
            <span className="block text-neutral-600">kcal</span>
            {product.product.kcal}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MealItem;

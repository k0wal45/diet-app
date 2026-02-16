"use client";
import { calculateDiet } from "@/lib/calculateDiet";
import { Diet, DietMeal, MealProduct } from "@/lib/Types";
import React, { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { PiAvocadoBold, PiBreadBold } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import MealItem from "./MealItem";

const calculateConsumedCalories = (meals: DietMeal[]) => {
  const makros = {
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };

  makros.kcal = meals.reduce(
    (acc: number, item: DietMeal) =>
      acc +
      Math.round(
        item.meal?.mealProducts.reduce(
          (sum: number, mealProduct: MealProduct) =>
            sum +
            mealProduct.product.kcal *
              (mealProduct.product.unit === "SLICE"
                ? mealProduct.quantity
                : mealProduct.quantity / 100),
          0,
        ) || 0,
      ),
    0,
  );
  makros.carbs = meals.reduce(
    (acc: number, item: DietMeal) =>
      acc +
      Math.round(
        item.meal?.mealProducts.reduce(
          (sum: number, mealProduct: MealProduct) =>
            sum +
            mealProduct.product.carbs *
              (mealProduct.product.unit === "SLICE"
                ? mealProduct.quantity
                : mealProduct.quantity / 100),
          0,
        ) || 0,
      ),
    0,
  );

  makros.fat = meals.reduce(
    (acc: number, item: DietMeal) =>
      acc +
      Math.round(
        item.meal?.mealProducts.reduce(
          (sum: number, mealProduct: MealProduct) =>
            sum +
            mealProduct.product.fat *
              (mealProduct.product.unit === "SLICE"
                ? mealProduct.quantity
                : mealProduct.quantity / 100),
          0,
        ) || 0,
      ),
    0,
  );

  makros.protein = meals.reduce(
    (acc: number, item: DietMeal) =>
      acc +
      Math.round(
        item.meal?.mealProducts.reduce(
          (sum: number, mealProduct: MealProduct) =>
            sum +
            mealProduct.product.protein *
              (mealProduct.product.unit === "SLICE"
                ? mealProduct.quantity
                : mealProduct.quantity / 100),
          0,
        ) || 0,
      ),
    0,
  );
  return makros;
};

const getDietTheme = (ratio: number) => {
  const percentage = ratio * 100;
  let r, g, b;
  if (percentage < 60) {
    [r, g, b] = [255, 69, 0];
  } else if (percentage >= 60 && percentage < 80) {
    [r, g, b] = [255, 165, 0];
  } else if (percentage >= 80 && percentage < 90) {
    [r, g, b] = [173, 255, 47];
  } else if (percentage >= 90 && percentage <= 110) {
    [r, g, b] = [34, 139, 34];
  } else if (percentage > 110 && percentage <= 120) {
    [r, g, b] = [255, 215, 0];
  } else {
    [r, g, b] = [255, 69, 0];
  }

  return {
    background: `rgb(${r}, ${g}, ${b})`,
    outline: `rgba(${r}, ${g}, ${b}, 0.3)`,
  };
};

const ListItem = ({ diet }: { diet: Diet }) => {
  const [showMeals, setShowMeals] = useState(false);

  const caloriesGoal = calculateDiet(diet.client!);
  const caloriesConsumed = calculateConsumedCalories(diet.dietMeals!);
  const ratio = caloriesConsumed.kcal / caloriesGoal.dailyCalories;

  const color = getDietTheme(ratio);

  return (
    <Fragment>
      <div className="ml-4 p-4 rounded-xl bg-neutral-100 flex flex-col gap-4 relative">
        <h2 className="text-xl">{diet.name}</h2>
        <h3 className="text-lg text-neutral-700">{diet.description}</h3>
        <div className="flex flex-col gap-1">
          <p>
            kcal: {caloriesConsumed.kcal}/{caloriesGoal.dailyCalories}
          </p>
          <div className="w-full grid place-items-center rounded-full bg-neutral-300 relative">
            <p className="text-lg text-white z-20">
              {Math.round(ratio * 1000) / 10}%
            </p>
            <div
              className="absolute top-0 left-0 h-full outline-4 rounded-full"
              style={{
                backgroundColor: color.background,
                outlineColor: color.outline,
                width: `${Math.min(ratio * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center justify-center">
            <div className="p-2 rounded-full bg-neutral-300">
              <TbMeat className="text-4xl text-amber-800" />
            </div>
            <p className="text-lg">
              Protein: {caloriesConsumed.protein}/
              {caloriesGoal.macros.protein.grams}g
            </p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="p-2 rounded-full bg-neutral-300">
              <PiBreadBold className="text-4xl text-yellow-700" />
            </div>
            <p className="text-lg">
              Carbs: {caloriesConsumed.carbs}/{caloriesGoal.macros.carbs.grams}
              /g
            </p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="p-2 rounded-full bg-neutral-300">
              <PiAvocadoBold className="text-4xl text-lime-600" />
            </div>
            <p className="text-lg">
              Fats: {caloriesConsumed.fat}/{caloriesGoal.macros.fats.grams}g
            </p>
          </div>

          <button
            className="p-4 rounded-lg bg-neutral-700 text-white font-semibold hover:bg-neutral-800 active:scale-95 duration-150"
            onClick={() => setShowMeals(!showMeals)}
          >
            {showMeals ? "Hide" : "Show"} meals
          </button>
        </div>
        <div className="absolute top-4 right-4 aspect-square p-2 rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-600 hover:text-neutral-100 z-10 active:scale-80 duration-150">
          <FaTrash />
        </div>
      </div>
      <div
        className={`ml-8 p-4 bg-neutral-200 rounded-xl ${showMeals ? "flex flex-col" : "hidden"} gap-4 `}
      >
        <p className="text-xl font-semibold">Meals</p>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {diet.dietMeals.map((item: DietMeal) => (
            <MealItem key={item.id} meal={item.meal} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ListItem;

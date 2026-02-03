import { calculateDiet } from "@/lib/calculateDiet";
import { Diet, DietMeal } from "@/lib/Types";
import React, { Fragment } from "react";
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
    (acc: number, item: DietMeal) => acc + (item.meal?.kcal || 0),
    0,
  );

  return makros;
};

const ListItem = ({ diet }: { diet: Diet }) => {
  const caloriesGoal = calculateDiet(diet.client!);
  const caloriesConsumed = calculateConsumedCalories(diet.dietMeals!);
  return (
    <Fragment>
      <div className="ml-4 p-4 rounded-xl bg-neutral-100 flex flex-col gap-4 relative">
        <h2 className="text-xl">{diet.name}</h2>
        <h3 className="text-lg text-neutral-700">{diet.description}</h3>
        <div className="flex flex-col gap-1">
          <p>
            kcal: {caloriesConsumed.kcal}/{caloriesGoal.dailyCalories}
          </p>
          <div className="w-full grid place-items-center rounded-full bg-green-700 outline-green-700/30 outline-4 outline-solid">
            <p className="text-lg text-white">100%</p>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-center justify-center">
            <div className="p-2 rounded-full bg-neutral-300">
              <TbMeat className="text-4xl text-amber-800" />
            </div>
            <p className="text-lg">Protein: 150g</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="p-2 rounded-full bg-neutral-300">
              <PiBreadBold className="text-4xl text-yellow-700" />
            </div>
            <p className="text-lg">Carbs: 150g</p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="p-2 rounded-full bg-neutral-300">
              <PiAvocadoBold className="text-4xl text-lime-600" />
            </div>
            <p className="text-lg">Fats: 150g</p>
          </div>

          <button className="p-4 rounded-lg bg-neutral-700 text-white font-semibold hover:bg-neutral-800 active:scale-95 duration-150">
            Show meals
          </button>
        </div>
        <div className="absolute top-4 right-4 aspect-square p-2 rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-600 hover:text-neutral-100 z-10 active:scale-80 duration-150">
          <FaTrash />
        </div>
      </div>
      <div className="ml-8 p-4 bg-neutral-200 rounded-xl flex flex-col gap-4 ">
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

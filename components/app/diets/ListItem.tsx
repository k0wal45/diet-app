import React from "react";
import { FaTrash } from "react-icons/fa";
import { PiAvocadoBold, PiBreadBold } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";

const ListItem = () => {
  return (
    <div className="ml-4 w-full p-4 rounded-xl bg-neutral-100 flex flex-col gap-4 relative">
      <h2 className="text-xl">Nazwa</h2>
      <h3 className="text-lg text-neutral-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima facilis
        accusamus saepe fugit maxime.
      </h3>
      <div className="flex flex-col gap-1">
        <p>KCAL: 2250/2250(LIMIT)</p>
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
  );
};

export default ListItem;

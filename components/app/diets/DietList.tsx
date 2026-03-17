"use client";
import React, { useState } from "react";
import ListItem from "./ListItem";
import { FaArrowDown, FaList, FaPlus } from "react-icons/fa";
import { Client, Diet } from "@/lib/Types";
import { FaPerson } from "react-icons/fa6";
import Link from "next/link";
import { mockDiets } from "@/lib/MOCK_DATA";

interface GroupedDiet {
  client: Client;
  diets: Diet[];
}

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

const DietList = ({
  setAddDiet,
}: {
  setAddDiet: React.Dispatch<React.SetStateAction<Client | boolean>>;
}) => {
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
            <div
              className="grid place-items-center bg-neutral-100 h-20 rounded-xl group hover:bg-neutral-200 duration-200 ml-4"
              onClick={() => setAddDiet(item.client)}
            >
              <div className="flex gap-4">
                <FaPlus className="text-neutral-700 text-2xl duration-200 group-hover:text-3xl group-active:text-2xl" />
                <FaList className="text-neutral-700 text-2xl duration-200 group-hover:text-3xl group-active:text-2xl" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <Link
        href="/app/clients"
        className="grid place-items-center bg-neutral-200 h-20 rounded-xl group hover:bg-neutral-100 duration-200 ml-4"
      >
        <div className="flex gap-2">
          <FaPlus className="text-neutral-700 text-2xl duration-200 group-hover:text-3xl group-active:text-2xl" />
          <FaPerson className="text-neutral-700 text-2xl duration-200 group-hover:text-3xl group-active:text-2xl" />
        </div>
      </Link>
    </div>
  );
};

export default DietList;

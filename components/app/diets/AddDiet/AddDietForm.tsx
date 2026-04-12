"use client";
import { Client, Diet } from "@/lib/Types";
import React from "react";
import { FaPlus } from "react-icons/fa";

const AddDietForm = ({
  dietData,
  setDietData,
  loading,
  setLoading,
  client,
  setAddMeal,
}: {
  dietData: Omit<Diet, "id" | "createdAt">;
  setDietData: React.Dispatch<
    React.SetStateAction<Omit<Diet, "id" | "createdAt">>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAddDiet: React.Dispatch<React.SetStateAction<Client | boolean>>;
  client: Client;
  setAddMeal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    } catch (error) {
      console.error("Error adding diet:", error);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setDietData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="w-240 rounded-xl z-10 p-4 bg-white gap-4 flex flex-col"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-semibold">
        Add new diet for <span className="inline font-bold">{client.name}</span>
      </h3>
      {/* name input */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-lg">
          Name
        </label>
        <input
          placeholder="Name"
          type="text"
          name="name"
          id="name"
          value={dietData.name}
          required
          onChange={handleInputChange}
          className="px-4 py-2 border-2 border-neutral-400 rounded-xl active:outline-none focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-lg">
          Description
        </label>
        <input
          placeholder="Description"
          type="text"
          name="description"
          id="description"
          value={dietData.description}
          required
          onChange={handleInputChange}
          className="px-4 py-2 border-2 border-neutral-400 rounded-xl active:outline-none focus:outline-none focus:ring-0"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg">Meals in diet</p>
        {dietData.dietMeals.length != 0
          ? dietData.dietMeals.map((item) => (
              <div
                className="flex p-4 rounded-xl border border-neutral-300 justify-around"
                key={item.id}
              >
                <p className="text-xl">{item.meal.name}</p>
              </div>
            ))
          : null}
        <div
          className="grid place-items-center p-4 rounded-xl bg-neutral-300 hover:bg-neutral-200 duration-200 group"
          onClick={() => setAddMeal(true)}
        >
          <FaPlus className="text-neutral-700 text-2xl duration-200 group-hover:text-3xl group-active:text-2xl group-hover:scale-105 group-active:scale-95" />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-primary text-lg hover:brightness-90 active:scale-95 transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default AddDietForm;

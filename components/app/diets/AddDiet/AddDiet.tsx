"use client";
import { Client, Diet } from "@/lib/Types";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddMeal from "./AddMeal";

const AddDiet = ({
  setAddDiet,
  client,
}: {
  setAddDiet: React.Dispatch<React.SetStateAction<Client | boolean>>;
  client: Client;
}) => {
  const [addMeal, setAddMeal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Diet, "id" | "createdAt">>({
    name: "",
    description: "",
    saved: false,
    clientId: 0,
    client: client,
    dietMeals: [],
  });

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="z-20 absolute w-screen h-screen top-0 left-0 place-items-center grid">
      <form
        className="w-240 rounded-xl z-10 p-4 bg-white gap-4 flex flex-col"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-semibold">
          Add new diet for{" "}
          <span className="inline font-bold">{client.name}</span>
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
            value={formData.name}
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
            value={formData.description}
            required
            onChange={handleInputChange}
            className="px-4 py-2 border-2 border-neutral-400 rounded-xl active:outline-none focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-lg">Meals in diet</p>
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
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {addMeal ? <AddMeal /> : null}
      <div
        className={`absolute w-screen h-screen top-0 left-0 place-items-center bg-black/50 grid`}
        onClick={() => setAddDiet(false)}
      ></div>
    </section>
  );
};

export default AddDiet;

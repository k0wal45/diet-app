import { Meal } from "@/lib/Types";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const AddMeal = ({
  setAddMeal,
}: {
  setAddMeal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Meal, "id" | "createdAt">>({
    name: "",
    description: "",
    mealProducts: [],
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
    setFormData((prevData: Omit<Meal, "id" | "createdAt">) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="relative w-120 rounded-xl z-10 p-4 bg-white border border-neutral-300 flex flex-col gap-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <FaXmark
        className="absolute top-4 right-4 hover:text-red-500 duration-100"
        onClick={() => setAddMeal(false)}
      />
      <p className="text-lg">Add Meal</p>
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
          value={formData.description || ""}
          required
          onChange={handleInputChange}
          className="px-4 py-2 border-2 border-neutral-400 rounded-xl active:outline-none focus:outline-none focus:ring-0"
        />
      </div>
      <div className="grid grid-cols-4 w-full divide-x-2 divide-neutral-300 p-2 rounded-xl bg-neutral-200 ">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-neutral-700">kcal</p>
          <p className="text-lg">100</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-neutral-700">Carbs</p>
          <p className="text-lg">100g</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-neutral-700">Protein</p>
          <p className="text-lg">100g</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-neutral-700">Fat</p>
          <p className="text-lg">100g</p>
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-lg hover:brightness-90 active:scale-95 transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddMeal;

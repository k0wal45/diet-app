import { Meal } from "@/lib/Types";
import React, { useState } from "react";

const AddMeal = () => {
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
    setFormData((prevData: Meal) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="absolute w-120 bottom-0 left-1/2 -translate-x-1/2 rounded-xl z-10 p-4 bg-white border border-neutral-300 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
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

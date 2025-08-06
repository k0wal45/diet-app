"use client";
import { Product } from "@/lib/Types";

import React, { useState } from "react";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt">>({
    name: "",
    description: "",
    category: "MEAT",
    protein: 0,
    fat: 0,
    carbs: 0,
    kcal: 0,
    unit: "G",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      console.log("Client added successfully:", data);
    } catch (error) {
      console.error("Error adding client:", error);
      setLoading(false);
      return;
    }
    setFormData({
      name: "",
      description: "",
      category: "MEAT",
      protein: 0,
      fat: 0,
      carbs: 0,
      kcal: 0,
      unit: "G",
    });
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`Input changed: ${name} = ${value} type: ${typeof value}`);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Add your new client</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-neutral-200 rounded-xl p-4 max-w-[25rem]"
      >
        {/* name input */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
          >
            Name
          </label>
          <input
            placeholder="John Doe"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            required
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        {/* description input */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
          >
            description
          </label>
          <textarea
            placeholder="drscription"
            type="text"
            name="email"
            id="email"
            value={formData.description}
            required
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex gap-4">
          {/* protein input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="protein"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Protein
            </label>
            <input
              min={0}
              placeholder="25"
              type="number"
              name="protein"
              id="protein"
              value={formData.protein}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-16"
            />
          </div>
          {/* fat input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="fat"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Fat
            </label>
            <input
              min={0}
              placeholder="25"
              type="number"
              name="fat"
              id="fat"
              value={formData.fat}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-16"
            />
          </div>
          {/* carbs input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="carbs"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Carbs
            </label>
            <input
              min={0}
              placeholder="25"
              type="number"
              name="carbs"
              id="carbs"
              value={formData.carbs}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-16"
            />
          </div>
        </div>
        {/* sex input */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="sex"
            className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          >
            <option value="MEAT">Meat</option>
            <option value="FISH">Fish</option>
            <option value="DAIRY">Dairy</option>
            <option value="FRUITS">Fruits</option>
            <option value="VEGETABLES">Vegetables</option>
            <option value="BREAD">Bread</option>
            <option value="COOKING">Cooking</option>
            <option value="LEGUMES">Legumes</option>
            <option value="SPICES">Spices</option>
            <option value="GRAINS">Grains</option>
            <option value="GREENS">Greens</option>
            <option value="OTHER">Other</option>
            <option value="SUPPLEMENTS">Supplements</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-lg hover:shadow-md active:scale-95 transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;

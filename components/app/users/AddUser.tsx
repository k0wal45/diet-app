"use client";
import { User } from "@/lib/Types";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "USER",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
      console.log("Product added successfully:", data);
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      return;
    }
    // setFormData({
    //   name: "",
    //   description: "",
    //   category: "MEAT",
    //   protein: 0,
    //   fat: 0,
    //   carbs: 0,
    //   kcal: 0,
    //   unit: "G",
    //   amount: 100,
    // });
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name == "unit") {
      if (value == "G" || value == "ML") {
        setFormData((prevData) => ({
          ...prevData,
          amount: 100,
        }));
      } else if (value == "SLICE") {
        setFormData((prevData) => ({
          ...prevData,
          amount: 1,
        }));
      }
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Add your new Product</h2>
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
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            required
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        {/* email input */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
          >
            E-mail
          </label>
          <input
            placeholder="E-mail"
            type="text"
            name="email"
            id="email"
            value={formData.email}
            required
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          />
        </div>

        {/* password input */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              required
              onChange={handleInputChange}
              className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 px-2 py-1 text-sm bg-neutral-300 rounded hover:bg-neutral-400"
              tabIndex={-1}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* role input */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="role"
            className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          >
            <option value="USER">User</option>
            <option value="DIETICIAN">Dietician</option>
            <option value="ADMIN">Admin</option>
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

export default AddUser;

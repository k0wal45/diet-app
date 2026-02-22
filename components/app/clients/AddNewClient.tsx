"use client";
import { useUser } from "@/hooks/useUser";
import { Client } from "@/lib/Types";

import React, { useState } from "react";

const AddNewClient = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Client, "id" | "createdBy">>({
    name: "",
    email: "",
    age: undefined,
    weight: undefined,
    height: undefined,
    sex: "MALE",
    activityFactor: 1.0,
  });
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.user) {
        throw new Error("User authentication error: " + user.error);
      }
      const trainerId = user.user.id;
      const response = await fetch("/api/clients/addClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, trainerId }),
      });
      if (!response.ok) {
        throw new Error("Failed to add client");
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
      email: "",
      age: undefined,
      weight: undefined,
      height: undefined,
      sex: "MALE",
      activityFactor: 1.0,
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
        className="flex flex-col gap-4 bg-neutral-200 rounded-xl p-4 max-w-100"
      >
        <div className="flex gap-4 w-full">
          {/* name input */}
          <div className="flex flex-col w-full">
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
          {/* activity factor */}
          <div className="flex flex-col w-fit">
            <label
              htmlFor="activityFactor"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Activity
            </label>
            <input
              min={0}
              max={5}
              placeholder="1.0"
              step={0.01}
              type="number"
              name="activityFactor"
              id="activityFactor"
              value={formData.activityFactor || ""}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-20"
            />
          </div>
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
            placeholder="email@domain.com"
            type="text"
            name="email"
            id="email"
            value={formData.email || ""}
            required
            onChange={handleInputChange}
            className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex gap-4">
          {/* age input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="age"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Age
            </label>
            <input
              min={0}
              max={150}
              placeholder="25"
              type="number"
              name="age"
              id="age"
              value={formData.age || ""}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-16"
            />
          </div>
          {/* sex input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="sex"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Sex
            </label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="px-4 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          {/* weight input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="weight"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Weight
            </label>
            <input
              min={0}
              max={500}
              placeholder="70"
              type="number"
              name="weight"
              id="weight"
              value={formData.weight || ""}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-16"
            />
          </div>
          {/* height input */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="height"
              className="px-2 pt-1 translate-y-1/4 bg-white rounded-t-xl w-fit"
            >
              Height
            </label>
            <input
              min={0}
              max={300}
              placeholder="175"
              type="number"
              name="height"
              id="height"
              value={formData.height || ""}
              required
              onChange={handleInputChange}
              className="pl-4 pr-2 py-2 bg-white rounded-xl active:outline-none focus:outline-none focus:ring-0 flex-1 w-16"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-lg hover:shadow-md active:scale-95 transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Client"}
        </button>
      </form>
    </section>
  );
};

export default AddNewClient;

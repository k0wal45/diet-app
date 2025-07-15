"use client";
import { Client } from "@/lib/Types";
import { Sex } from "@prisma/client";
import React, { useState } from "react";

const AddNewClient = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Client>({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    sex: "MALE" as Sex,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value, type } = e.target;

    console.log(name, value, type);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Add your new client</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-neutral-200 rounded-xl p-4"
      >
        <input
          type="text"
          onChange={handleInputChange}
          className="px-4 py-2 bg-white rounded-xl"
        />
      </form>
    </section>
  );
};

export default AddNewClient;

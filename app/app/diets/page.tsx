"use client";
import AddDietWrapper from "@/components/app/diets/AddDietWrapper";
import DietList from "@/components/app/diets/DietList";
import { Client } from "@/lib/Types";
import React, { useState } from "react";

const Page = () => {
  const [addDiet, setAddDiet] = useState<Client | boolean>(false);

  return (
    <section className="flex flex-col gap-8 p-8 w-screen max-w-screen">
      <h1 className="text-xl font-semibold">Diets</h1>
      <DietList setAddDiet={setAddDiet} />
      {addDiet && typeof addDiet !== "boolean" ? (
        <AddDietWrapper setAddDiet={setAddDiet} client={addDiet} />
      ) : null}
    </section>
  );
};

export default Page;

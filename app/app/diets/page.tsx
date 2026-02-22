"use client";
import AddDiet from "@/components/app/diets/AddDiet";
import DietList from "@/components/app/diets/DietList";
import React, { useState } from "react";

const Page = () => {
  const [addDiet, setAddDiet] = useState<boolean>(false);
  console.log(addDiet);
  return (
    <section className="flex flex-col gap-8 p-8 w-screen max-w-screen">
      <h1 className="text-xl font-semibold">Diets</h1>
      <DietList addDiet={addDiet} setAddDiet={setAddDiet} />
      {addDiet ? <AddDiet setAddDiet={setAddDiet} /> : null}
    </section>
  );
};

export default Page;

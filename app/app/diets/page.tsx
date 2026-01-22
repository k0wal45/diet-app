import DietList from "@/components/app/diet/DietList";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col gap-8 p-8 w-full">
      <h1 className="text-xl font-semibold">Diets</h1>
      <DietList />
    </section>
  );
};

export default page;

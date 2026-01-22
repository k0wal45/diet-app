"use client";
import AddNewClient from "@/components/app/clients/AddNewClient";
import YourClients from "@/components/app/clients/YourClients/YourClients";
import React from "react";

const Page = () => {
  return (
    <section className="flex flex-col gap-8 p-8">
      <AddNewClient />
      <YourClients />
    </section>
  );
};

export default Page;

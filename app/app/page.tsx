"use client";
import AddNewClient from "@/components/app/Home/AddNewClient";
import YourClients from "@/components/app/Home/YourClients/YourClients";
import { useUser } from "@/hooks/useUser";
import React from "react";

const Page = () => {
  const { user, loading } = useUser();

  return (
    <section className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">
          {loading ? "Loading..." : "Good morning, " + user?.name}
        </p>
        <p className="text-thin">Track your clients diets and manage details</p>
      </div>
      <AddNewClient />
      <YourClients />
    </section>
  );
};

export default Page;

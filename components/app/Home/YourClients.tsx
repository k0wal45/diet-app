"use client";
import { Client } from "@/lib/Types";
import React, { useEffect, useState } from "react";

const YourClients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/getUserData", {
          method: "GET",
          credentials: "include",
        });

        const data = await res;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col">
      <h1 className="text-xl font-semibold">Your cleints</h1>
    </section>
  );
};

export default YourClients;

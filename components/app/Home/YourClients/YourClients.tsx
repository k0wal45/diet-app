"use client";
import { useUser } from "@/hooks/useUser";
import { Client } from "@/lib/Types";
import React, { useEffect, useState } from "react";
import ClientItem from "./ClientItem";

const YourClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          console.error("User not found");
          return;
        }
        const res = await fetch(
          "/api/clients/getClientByDietician?trainer=" + user.id,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [loading, user]);

  if (loading && clientsLoading) {
    return (
      <section>
        <h1>Please wait</h1>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <h1 className="text-xl font-semibold">Your cleints</h1>
      {clientsLoading ? (
        <div className="">loading ...</div>
      ) : (
        <div className="flex gap-8">
          {clients.map((clientObject: Client) => (
            <ClientItem client={clientObject} key={clientObject.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default YourClients;

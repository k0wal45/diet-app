"use client";
import { Client, Diet } from "@/lib/Types";
import React, { useState } from "react";
import AddDietForm from "./AddDiet/AddDietForm";
// Pamiętaj o imporcie AddMealForm
import AddMealForm from "./AddDiet/AddMealForm";

const AddDietWrapper = ({
  setAddDiet,
  client,
}: {
  setAddDiet: React.Dispatch<React.SetStateAction<Client | boolean>>;
  client: Client;
}) => {
  const [addMeal, setAddMeal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [dietData, setDietData] = useState<Omit<Diet, "id" | "createdAt">>({
    name: "",
    description: "",
    saved: false,
    clientId: client?.id || 0, // Dodałem zabezpieczenie, gdyby client był pusty
    client: client,
    dietMeals: [],
  });

  const quitAddDiet = () => {
    if (window.confirm("Do you want to quit?")) {
      setAddDiet(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Tło (Backdrop) - kliknięcie w ciemne tło zamyka główny modal */}
      <div className="absolute inset-0 bg-black/50" onClick={quitAddDiet}></div>

      {/* 2. Kontener na formularz - musi mieć z-index wyższy niż tło */}
      <div className="relative z-10 w-full max-w-2xl flex justify-center">
        {/* LOGIKA PODMIANY WIDOKÓW */}
        {!addMeal ? (
          <AddDietForm
            dietData={dietData}
            setDietData={setDietData}
            loading={loading}
            setLoading={setLoading}
            setAddDiet={setAddDiet}
            client={client}
            // Podajemy setAddMeal w dół, by przycisk "Add Meal" w AddDietForm mógł zmienić widok
            setAddMeal={setAddMeal}
          />
        ) : (
          <AddMealForm
            setDietData={setDietData}
            // Podajemy setAddMeal, by po zapisaniu posiłku (lub kliknięciu "Wróć") móc wrócić do widoku diety
            setAddMeal={setAddMeal}
          />
        )}
      </div>
    </section>
  );
};

export default AddDietWrapper;

import React from "react";
import Background from "../Background/Background";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-screen h-screen relative">
      <Background />

      <div className="flex flex-col items-center  justify-center h-full text-center text-white max-w-2xl mx-auto px-4 gap-4">
        <div className="flex gap-4 rounded-full pr-4 bg-white/20 w-fit items-center p-1">
          <div className="px-2 py-1 bg-secondary text-black rounded-full">
            Funckja
          </div>
          <p>Automatyczne liczenie makroskładników</p>
        </div>
        <h1 className="text-6xl font-semibold mb-4 leading-tight">
          Twórz diety prosto i przyjemnie
        </h1>
        <p className="text-lg">
          Apliakcja do tworzenia diet, która ułatwia planowanie posiłków i
          zarządzanie nimi
        </p>
        <div className="flex gap-4 items-center justify-center mt-8">
          <Link
            href="/app"
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary hover:text-black transition"
          >
            Przejdź do apliakcji
          </Link>
          <a
            href="#about"
            className="px-6 py-3 border-solid border-2 border-white text-white rounded-full hover:bg-white/30 transition"
          >
            O aplikacji
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

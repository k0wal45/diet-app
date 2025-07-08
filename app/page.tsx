"use client";

import About from "@/components/LandindPage/About";
import Hero from "@/components/LandindPage/Hero/Hero";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
    </main>
  );
}

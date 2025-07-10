import About from "@/components/LandindPage/About";
import Footer from "@/components/LandindPage/Footer";
import Hero from "@/components/LandindPage/Hero/Hero";
import HowToUse from "@/components/LandindPage/HowToUse";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <HowToUse />
      <Footer />
    </main>
  );
}

import React from "react";
import SectionTitle from "./SectionTitle";
import { FiBarChart2, FiEdit3, FiSmartphone, FiUserPlus } from "react-icons/fi";
import { MdAutoGraph, MdOutlineFastfood } from "react-icons/md";

const features = [
  {
    icon: <FiUserPlus className="text-white text-4xl" />,
    title: "Szybki start z klientem",
    description:
      "Dodaj nowego klienta w kilka sekund i rozpocznij budowanie jego planu żywieniowego.",
  },
  {
    icon: <FiEdit3 className="text-white text-4xl" />,
    title: "Edycja posiłków na bieżąco",
    description:
      "Aktualizuj diety i posiłki klientów w czasie rzeczywistym — bez potrzeby zapisywania osobnych wersji.",
  },
  {
    icon: <FiSmartphone className="text-white text-4xl" />,
    title: "Zawsze pod ręką",
    description:
      "Aplikacja przystosowana do telefonu — łatwy dostęp dla dietetyka i klienta z każdego miejsca.",
  },
  {
    icon: <FiBarChart2 className="text-white text-4xl" />,
    title: "Automatyczne makroskładniki",
    description:
      "Automatyczne przeliczanie białek, tłuszczy i węglowodanów na podstawie składu posiłków.",
  },
  {
    icon: <MdAutoGraph className="text-white text-4xl" />,
    title: "Sztuczna inteligencja w diecie",
    description:
      "Inteligentne sugestie na podstawie celów klienta, preferencji i historii żywieniowej.",
  },
  {
    icon: <MdOutlineFastfood className="text-white text-4xl" />,
    title: "Nowoczesne plany diety",
    description:
      "Twórz i udostępniaj klientom spersonalizowane jadłospisy w formie cyfrowej — natychmiast.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="px-4 lg:px-8 py-16  mx-auto flex flex-col items-center gap-8"
    >
      <SectionTitle title="O aplikacji" />
      <h2 className="text-6xl font-semibold max-w-4xl text-center leading-tight">
        Odżywianie w nowej odsłonie dla przyszłych pokoleń
      </h2>
      <p className="text-lg max-w-3xl text-center">
        Zadbaj o zdrowie z pomocą nowoczesnych narzędzi dietetycznych, opartych
        na analizie danych, personalizacji i automatyzacji.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 rounded-4xl bg-neutral-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4 aspect-square rounded-full p-4 bg-primary">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;

import React from "react";
import { PiStarFourFill } from "react-icons/pi";

const About = () => {
  return (
    <section
      id="about"
      className="px-4 lg:px-8 py-16  mx-auto flex flex-col items-center gap-6"
    >
      <div className="flex items-center px-3 py-2 rounded-full border-1 border-solid border-primary w-fit gap-2 text-primary text-sm">
        <PiStarFourFill />
        <p>O aplikacji</p>
      </div>
      <h2 className="text-6xl font-semibold max-w-4xl text-center">
        Odżywianie w nowej odsłonie dla przyszłych pokoleń
      </h2>
      <p className="text-lg max-w-3xl text-center">
        Zadbaj o zdrowie z pomocą nowoczesnych narzędzi dietetycznych, opartych
        na analizie danych, personalizacji i automatyzacji.
      </p>
    </section>
  );
};

export default About;

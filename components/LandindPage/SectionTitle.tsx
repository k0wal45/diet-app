import React from "react";
import { PiStarFourFill } from "react-icons/pi";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center px-3 py-2 rounded-full border-1 border-solid border-primary w-fit gap-2 text-primary text-sm">
      <PiStarFourFill />
      <p className="text-base">{title}</p>
    </div>
  );
};

export default SectionTitle;

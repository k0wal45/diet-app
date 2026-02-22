"use client";
import React from "react";

const AddDiet = ({
  setAddDiet,
}: {
  setAddDiet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <section
      className={`z-20 w-screen h-screen absolute top-0 left-0 place-items-center bg-black/40 grid`}
      onClick={() => setAddDiet(false)}
    >
      <div className="w-240 rounded-xl z-10 p-4 bg-white"></div>
    </section>
  );
};

export default AddDiet;

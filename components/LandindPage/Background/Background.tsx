";use client";
import React, { useEffect, useState } from "react";
import "./background.css";
import Blob from "./Blob/Blob";

const Background = () => {
  const [width, setWidth] = useState(Math.floor(window.innerWidth / 15));
  const [rows, setRows] = useState(Math.floor(window.innerHeight / width) + 2);
  const [highlithed, setHighlighted] = useState([1, 4, 7, 10, 13]);

  console.log("Width:", width);
  console.log("Rows:", rows);

  useEffect(() => {
    const handleResize: () => void = () => {
      setWidth(Math.floor(window.innerWidth / 15));
      setRows(Math.floor(window.innerHeight / width) + 2);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-[-1] bg-background max-w-screen overflow-hidden">
      {/* Blob 1 – Lewy górny */}
      <div className="blob fill-secondary/10 blur-[100px] top-[-100px] left-[-100px] lg:w-[40rem] w-64 absolute animated-blob1 z-[-1]">
        <Blob />
      </div>

      {/* Blob 2 – Prawy dolny */}
      <div className="blob fill-secondary/15 blur-[100px] bottom-[-100px] right-[-100px] lg:w-[40rem] w-72 absolute animated-blob2 z-[-2]">
        <Blob />
      </div>

      {/* Blob 3 – Lewy środek */}
      <div className="blob fill-secondary/10 blur-[100px] top-[40%] left-[-150px] lg:w-[40rem] w-56 absolute animated-blob3 z-[-3]">
        <Blob />
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-15 w-full">
            {Array.from({ length: 15 }).map((_, colIndex) => (
              <div key={colIndex} className={`square`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background;

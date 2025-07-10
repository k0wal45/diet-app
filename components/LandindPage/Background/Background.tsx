"use client";
import React, { useEffect, useRef, useState } from "react";
import "./background.css";
import Blob from "./Blob/Blob";

type Square = [number, number];

const squareKey = (square: Square) => `${square[0]}-${square[1]}`;

const Background = () => {
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [highlighted, setHighlighted] = useState<Square[]>([
    [1, 2],
    [7, 4],
    [3, 5],
    [12, 6],
    [11, 5],
    [14, 8],
    [3, 3],
    [5, 1],
  ]);
  const [fadingOut, setFadingOut] = useState<Square[]>([]);
  const [fadingIn, setFadingIn] = useState<Square[]>([]);

  const prevHighlighted = useRef<Square[]>(highlighted);

  useEffect(() => {
    const updateSize = () => {
      setCols(Math.floor(window.innerWidth / (8 * 16)));
      setRows(Math.floor(window.innerHeight / (8 * 16)));
    };

    updateSize();

    const handleResize = () => {
      setCols(Math.floor(window.innerWidth / (8 * 16)));
      setRows(Math.floor(window.innerHeight / (8 * 16)));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlighted((prev) => {
        const newHighlighted = [...prev];
        const removed = newHighlighted.pop()!;

        const randomSquare: Square = [
          Math.floor(Math.random() * cols),
          Math.floor(Math.random() * rows),
        ];

        while (
          newHighlighted.some((s) => squareKey(s) === squareKey(randomSquare))
        ) {
          // Ensure the new square is not already highlighted
          randomSquare[0] = Math.floor(Math.random() * cols);
          randomSquare[1] = Math.floor(Math.random() * rows);
        }

        newHighlighted.unshift(randomSquare);

        // Find which square was removed and which was added
        setFadingOut([removed]);
        setFadingIn([randomSquare]);

        // Remove fade-out after animation
        setTimeout(() => setFadingOut([]), 500); // adjust to your fade-out duration
        setTimeout(() => setFadingIn([]), 500); // adjust to your fade-in duration

        prevHighlighted.current = newHighlighted;
        return newHighlighted;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [cols, rows]);

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

      <div className="absolute top-0 left-0 w-full h-full background-grid">
        <div className="relative w-full h-full">
          {highlighted.map((square) => {
            const key = squareKey(square);
            let fadeClass = "";
            if (fadingIn.some((s) => squareKey(s) === key)) {
              fadeClass = "fade-in";
            }
            return (
              <div
                key={key}
                className={`absolute w-[8rem] h-[8rem] bg-neutral-200/10 ${fadeClass}`}
                style={{
                  top: 8 * square[1] + "rem",
                  left: 8 * square[0] + "rem",
                }}
              ></div>
            );
          })}
          {fadingOut.map((square) => {
            const key = squareKey(square);
            return (
              <div
                key={key}
                className="absolute w-[8rem] h-[8rem] bg-neutral-200/10 fade-out"
                style={{
                  top: 8 * square[1] + "rem",
                  left: 8 * square[0] + "rem",
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Background;

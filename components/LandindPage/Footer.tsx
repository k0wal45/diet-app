import React from "react";
import Background from "./Background/Background";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="relative w-screen text-white flex flex-col md:flex-row items-center justify-between py-8 px-12">
      <p>Copyright © {year} - All right reserved</p>
      <p>
        Created by:{" "}
        <a href="https://lunarisweb.pl/" className="underline">
          Lunaris Web
        </a>
      </p>
      <Background />
    </footer>
  );
};

export default Footer;

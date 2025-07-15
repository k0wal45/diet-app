"use client";
import Link from "next/link";
import React from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";

interface PageProps {
  params: { slug: string[] };
}

const Page = ({ params }: PageProps) => {
  const { slug } = params;

  const signOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/"; // Redirect to home page after sign out
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="h-screen mx-auto flex flex-col items-center justify-center gap-8 max-w-2xl">
      <h1 className="text-7xl font-semibold">Ooops!</h1>

      <p className="text-xl">
        Path: {slug.map((item) => "/" + item)} is unavilable
      </p>

      <div className="flex gap-8">
        <Link
          href="/app"
          className="px-4 py-2 bg-black text-lg text-white rounded-xl font-semibold transition-colors duration-200 hover:bg-neutral-600 active:bg-neutral-900"
        >
          Return to app
        </Link>

        <button
          onClick={signOut}
          className="flex gap-2 items-center px-4 py-2 border-dashed border-2 border-black text-lg text-black rounded-xl font-semibold transition-all duration-200 hover:rounded-md active:scale-90"
        >
          <FaArrowRightToBracket />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Page;

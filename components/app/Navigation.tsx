"use client";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { FaList, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { PiGridFour } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";

const Navigation = () => {
  const { user, loading, error } = useUser();

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

  function firstLetterCapital(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <nav className="sticky top-0 left-0 h-screen p-4 bg-neutral-300 flex flex-col w-56 gap-6">
      <div className="flex gap-4 items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-10"
        />
        <p className="text-xl font-semibold">diet-app</p>
      </div>

      <ul className="mt-8 flex flex-col gap-2 w-full">
        <li className="w-full">
          <Link
            href="/app"
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <PiGridFour className="text-2xl" />
            Dashboard
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/app/clients"
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <FaUser className="text-2xl" />
            Clients
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/app/products"
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <TbMeat className="text-2xl" />
            Products
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/app/meals"
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <GiHotMeal className="text-2xl" />
            Meals
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/app/diets"
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <FaList className="text-2xl" />
            Diets
          </Link>
        </li>
      </ul>

      <div className="h-[1px] bg-neutral-400/50 w-full"></div>

      {user && user.role && user.role.toLowerCase() === "admin" ? (
        <ul className="flex flex-col gap-2 w-full">
          <li className="text-xl font-semibold">Admin</li>
          <li className="w-full">
            <Link
              href="/app"
              className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
            >
              <PiGridFour className="text-2xl" />
              Dashboard
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/app/clients"
              className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
            >
              <FaUser className="text-2xl" />
              Clients
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/app/products"
              className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
            >
              <TbMeat className="text-2xl" />
              Products
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}

      <div className="mt-auto flex flex-col bg-white rounded-xl px-4 py-2">
        <p>
          {loading
            ? ""
            : error
            ? ""
            : user
            ? firstLetterCapital(user.name ?? "")
            : "user not found"}
        </p>
        <a href={"mailto:" + user?.email} className="text-sm underline">
          {loading ? "Loading..." : error ? "Error loading user" : user?.email}
        </a>
      </div>

      <div className="h-[1px] bg-neutral-400/50 w-full"></div>

      <ul className="flex flex-col gap-2 w-full">
        <li className="w-full">
          <Link
            href="/app/configuration"
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <FaGear className="text-xl" />
            Configuration
          </Link>
        </li>
        <li className="w-full">
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-lg rounded-xl w-full p-2 hover:bg-neutral-900 hover:text-white active:bg-neutral-800 transition-all duration-200"
          >
            <FaArrowRightFromBracket className="text-xl" />
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

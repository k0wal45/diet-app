"use client";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { FaList, FaUser } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { PiGridFour } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";

const Navigation = () => {
  const { user, loading, error } = useUser();

  return (
    <nav className="h-screen p-4 bg-neutral-300 flex flex-col w-56">
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
            href="/app/dashboard"
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

      <div className="mt-auto">
        <p className="text-sm text-center">
          {loading ? "Loading..." : error ? "Error loading user" : user?.email}
        </p>
      </div>
    </nav>
  );
};

export default Navigation;

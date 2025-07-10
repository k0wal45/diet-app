"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    check: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
    } catch (error) {
      console.error("Error:", error);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubtmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.check) {
      alert("You bot");
      return false;
    }
    if (formData.email === "" || formData.password === "") {
      alert("Please fill all fields");
      return false;
    }

    try {
      const { email, password } = formData;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return false;
      }

      const response = await fetch("/api/auth/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return false;
      }

      if (data.success) {
        alert("Login successful");
        return router.push("/app");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="w-xl mx-auto px-16 pt-8 pb-16 bg-black text-white rounded-2xl flex items-center justify-center flex-col gap-4 relative
    before:content-['']
    before:h-2/3 before:aspect-square before:bg-gradient-to-r before:bg-neutral-200 before:absolute before:top-0 before:-left-1/2 before:rounded-l-full before:-z-10
    after:h-2/3 after:aspect-square after:bg-gradient-to-r after:bg-neutral-200 after:absolute after:bottom-0 after:-right-1/2 after:rounded-r-full after:-z-10
    "
    >
      <div className="aspect-square rounded-xl bg-neutral-900 w-fit p-3">
        <FaUserShield className="text-white text-xl" />
      </div>
      <p className="text-lg font-semibold mb-12">diet-app</p>
      <h1 className="text-5xl font-bold">Login</h1>
      <p className="mb-16">Zaloguj się do aplikacji</p>
      <form onSubmit={handleSubtmit} className="w-full flex flex-col gap-4">
        <div className="w-full mb-4">
          <label htmlFor="email" className="mb-2 block">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Wpisz tu swój e-mail"
            className="w-full p-2 border bg-gray-300 rounded-xl text-black text-lg"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Wpisz tu swoje hasło"
            className="w-full p-2 border bg-gray-300 rounded-xl text-black text-lg"
          />
        </div>
        <div style={{ display: "none" }}>
          <input
            type="checkbox"
            id="check"
            name="check"
            value={String(formData.check)}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-neutral-900 text-white p-3 rounded-xl text-lg font-semibold hover:bg-neutral-800 transition-colors mt-8"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

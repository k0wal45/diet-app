"use client";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    check: false,
  });

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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubtmit}>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

"use client";
import React from "react";

const AddUserButton = () => {
  const addUser = async () => {
    try {
      const response = await fetch("/api/user/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "dietician@diet-app.com",
          name: "Dietician",
          role: "DIETICIAN",
          password: "dieticianpassword",
        }),
      });

      console.log("Response status:", response.status);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return <button onClick={addUser}>Add user</button>;
};

export default AddUserButton;

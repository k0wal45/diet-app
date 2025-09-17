"use client";
import AddUser from "@/components/app/users/AddUser";
import { User } from "@/lib/Types";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/getAllUsers");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col p-8 gap-4 w-full">
      <h1 className="text-xl font-semibold">Manage Users</h1>
      <AddUser />
      <h2 className="text-xl font-semibold">Manage Users</h2>
      <div className="flex flex-col border-neutral-200 border-1 rounded-lg shadow-md text-lg w-full overflow-hidden">
        <div className="grid grid-cols-4 p-4 w-full bg-neutral-100 ">
          {/* nav */}
          <p className="font-semibold">ID</p>
          <p className="font-semibold">Name</p>
          <p className="font-semibold">E-mail</p>
          <p className="font-semibold">Role</p>
        </div>
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          users.map((user, index) => (
            <div
              className={`grid grid-cols-4 p-4 w-full ${
                index % 2 !== 0 ? "bg-neutral-50" : ""
              }`}
              key={index}
            >
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Page;

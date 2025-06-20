"use client";

export default function Home() {
  const AddUser = async () => {
    await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "email@email.com",
        name: "John Doe",
      }),
    });
  };

  const GetUsers = async () => {
    const response = await fetch("/api/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Users:", data);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome to the Next.js App!</h1>
        <div className="flex flex-col gap-2">
          <button onClick={() => AddUser()}>Add User</button>

          <button onClick={() => GetUsers()}>Get Users</button>
        </div>
      </div>
    </div>
  );
}

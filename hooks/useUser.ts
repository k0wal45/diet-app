import { useEffect, useState } from "react";
import { User } from "@/lib/Types"; // Use shared type for consistency

export const LOCAL_STORAGE_KEY = "diet-app-user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      // 1. Try to get user from localStorage
      const localUser =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_KEY)
          : null;

      if (localUser) {
        try {
          const parsedUser = JSON.parse(localUser) as User;
          setUser(parsedUser);
          setLoading(false);
          return;
        } catch {
          // If parsing fails, clear localStorage and continue to fetch
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }

      // 2. Fetch user from API if not in localStorage
      try {
        const res = await fetch("/api/auth/getUserData", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        setUser(data.user);
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.user));
        }
      } catch (err: unknown) {
        setUser(null);
        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          setError((err as { message: string }).message);
        } else {
          setError("Failed to fetch user");
        }
        // Remove possibly invalid user from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

import { LOCAL_STORAGE_KEY } from "@/hooks/useUser";

export const signOut = async () => {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/"; // Redirect to home page after sign out
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      console.error("Failed to sign out");
    }
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};

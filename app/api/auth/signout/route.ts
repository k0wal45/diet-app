import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Handle the sign-out logic here, such as clearing cookies or session data
    const response = NextResponse.json({
      success: true,
      message: "Signed out successfully",
    });

    // Clear the JWT cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 3600, // 1 hour expiry
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during sign out:", error);
    return NextResponse.json(
      { success: false, error: "Sign out failed" },
      { status: 500 }
    );
  }
}

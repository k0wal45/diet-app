import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found, redirecting to login.");

    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token
    const valid = await jwtVerify(token, secret);

    if (!valid) {
      throw new Error("Token verification failed");
    }

    // Clone the request and add the Authorization header
    const response = NextResponse.next();
    response.headers.set("Authorization", `Bearer ${token}`);
    return response;
  } catch {
    console.log("Token verification failed, redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/app/:path*"],
};

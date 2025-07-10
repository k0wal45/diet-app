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
    const valid = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (!valid) {
      throw new Error("Token verification failed");
    }

    if (valid.payload.exp && Date.now() >= valid.payload.exp * 1000) {
      console.log("Token has expired, redirecting to login.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!valid.payload.role || !valid.payload.id) {
      console.log("Token payload is missing role or id, redirecting to login.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    console.log("Token verification failed, redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/app/:path*"],
};

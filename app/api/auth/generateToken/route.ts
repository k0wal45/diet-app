import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure secret key

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    const { email, password } = body;

    const ParsedEmail = email.trim().toLowerCase(); // Normalize email input

    // Query to check username or email from the decoded token
    const user = await prisma.user.findUnique({
      where: {
        email: ParsedEmail,
      },
    });
    // Execute the query to find the user

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        error: "Invalid credentials",
      });
    }

    if (!SECRET_KEY) {
      return NextResponse.json({
        success: false,
        error: "JWT_SECRET is not defined",
      });
    }

    // Validate the credentials (this is just an example, replace with your logic)
    if (user.email === ParsedEmail && isMatch) {
      // Generate a JWT
      const token = jwt.sign({ role: user.role, id: user.id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      const response = NextResponse.json({ success: true });

      // Set JWT in HTTP-only cookie
      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 3600, // 1 hour expiry
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json({
        success: false,
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error generating token:", error);

    // Return the response with the error message
    return NextResponse.json({ success: false, error: error });
  }
}

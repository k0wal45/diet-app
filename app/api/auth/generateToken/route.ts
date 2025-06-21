import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure secret key

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    const { email, password } = body;

    // Query to check username or email from the decoded token

    // Execute the query to find the user

    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Validate the credentials (this is just an example, replace with your logic)
    if (data.email === email && isMatch) {
      // Generate a JWT
      const token = jwt.sign(
        { role: data.role, id: new ObjectId(data._id) },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      const response = NextResponse.json({ success: true });

      // Set JWT in HTTP-only cookie
      response.cookies.set("token", token, {
        httpOnly: false, // Allow client-side access
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
    return NextResponse.json({ success: false, error: error.message });
  }
}

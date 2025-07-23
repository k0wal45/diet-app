import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function checkValidToken(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  console.log(authHeader);

  if (!token) {
    return false;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return false;
  }

  const decode = jwt.verify(token, jwtSecret);

  if (!decode || typeof decode === "string") {
    return false;
  }
  // Check if the token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (!decode.exp || decode.exp < currentTime) {
    return false; // Token is expired
  }
  // Check if the token is valid
  return decode;
}

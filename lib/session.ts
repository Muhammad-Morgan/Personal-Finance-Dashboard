"use server";
import "server-only"; // Ensures this file only runs on the server side.
import { cookies } from "next/headers"; // Import the Next.js cookies utility to handle cookies.
import { SignJWT, jwtVerify } from "jose"; // Import functions from jose to sign and verify JWTs.
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET!; // Get the secret key from environment variables.
const encodedKey = new TextEncoder().encode(secretKey); // Convert the secret key into a Uint8Array for jose.

type SessionPayload = {
  userId: string; // The ID of the user to store in the session.
  expiresAt: string; // The expiration time of the session as an ISO string.
};
// The middle ware
// Creating session token that will be stored in the cookie
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload) // Create a new JWT with the session payload.
    .setProtectedHeader({ alg: "HS256" }) // Set the algorithm for the JWT.
    .setIssuedAt() // Set the "issued at" timestamp.
    .setExpirationTime("7d") // Set the token to expire in 7 days.
    .sign(encodedKey); // Sign the JWT with the encoded secret key.
}
// Verifies JWT using the secret to make sure it was created by me. If valid, it extracts and returns session data. If not returns null - user isn't authenticated.
export async function decrypt(token?: string) {
  if (!token) return null; // If no token is provided, return null.
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"], // Verify the JWT using the same algorithm and key.
    });
    return payload as unknown as SessionPayload; // Return the decoded payload if verification succeeds.
  } catch {
    return null; // If verification fails, return null and let the caller decide.
  }
}
// creates JWT session token tied to a user and valid for 7 days. Stores token in an HTTP-only cookie, so browser automatically sends it on requests. This is the login moment where session is established.
export async function createSession(userId: string, rememberMe?: boolean) {
  const SESSION_AGE = rememberMe
    ? new Date(Date.now() + 60 * 60 * 24 * 30 * 1000) // 30 days
    : new Date(Date.now() + 60 * 60 * 24 * 1000); // 1 day
  const token = await encrypt({ userId, expiresAt: SESSION_AGE.toISOString() }); // Create a signed JWT with the user ID and expiration.

  const cookieStore = cookies(); // Get the cookie store from the Next.js server API.
  (await cookieStore).set("session", token, {
    httpOnly: true, // Make the cookie HTTP-only for security.
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production.
    sameSite: "lax", // Set SameSite policy to lax.
    expires: SESSION_AGE, // Set the cookie expiration time.
    path: "/", // Cookie is valid for the entire site.
  });
}
// Clear session by overwriting the cookie with an expired one. Browser deletes cookie immediately. This is Logout action.
export async function deleteSession() {
  const cookieStore = cookies();
  (await cookieStore).set("session", "", {
    httpOnly: true, // Same security settings as before.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // Set the cookie to expire immediately, deleting it.
    path: "/",
  });
}
// Reads session cookie sent automatically by the browser. verifies and decodes. returns session data if token is valid.
export async function getSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session")?.value; // Retrieve the session token from the cookie.
  return decrypt(token); // Decrypt and return the session payload, or null if invalid.
}

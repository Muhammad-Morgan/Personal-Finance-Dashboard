import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  let body: { email?: string; password?: string; rememberMe?: boolean };
  try {
    body = await req.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  const email = body?.email?.toLowerCase().trim();
  const password = body?.password;
  const rememberMe = body?.rememberMe;
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Wrong password" }, { status: 401 });
  }
  // create session cookie (your function sets the HttpOnly cookie)
  await createSession(user.id, rememberMe);
  return NextResponse.json({ ok: true }, { status: 200 });
}

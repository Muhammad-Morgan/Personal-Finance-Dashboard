import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export default async function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const session = await decrypt(token);
  if (!session) return NextResponse.redirect(new URL("/login", req.url));
}
export const config = {
  matcher: ["/dashboard/:path*"],
};

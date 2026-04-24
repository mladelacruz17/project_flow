import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * Returns the currently authenticated user session
 * Used to persist login state across page refresh
 */
export async function GET(req: Request) {
  const res = new NextResponse();

    const session = await getSession(req, res);

  return NextResponse.json({
    user: session.user ?? null,
  });
}
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

/**
 * Logs out the current user by destroying their session
 */
export async function POST(req: Request) {
  try {
    const res = NextResponse.json({ message: "Logged out" });

    const session = await getIronSession(req, res, sessionOptions);

    // Destroy session to remove authentication state
    session.destroy();

    // Persist session destruction to clear cookie
    await session.save();

    return res;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
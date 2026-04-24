import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { readDB } from "@/lib/db";
import { getSession } from "@/lib/session";
import type { User } from "@/types";

/**
 * Handles user login:
 * - Validates credentials
 * - Compares hashed password
 * - Creates session using iron-session
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Basic input validation
    if (![email, password].every(v => typeof v === "string")) {
      return NextResponse.json(
        { message: "Invalid input" },
        { status: 400 }
      );
    }

    const db = readDB() as { users: User[] };

    // Find user by email
    const user = db.users.find((u: User) => u.email === email);

    // Do not reveal whether email exists (prevents user enumeration)
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare provided password with stored hashed password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ message: "Logged in" });

    // Create session and store minimal user info
    const session = await getSession(req, res);

    session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    await session.save();

    return res;

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
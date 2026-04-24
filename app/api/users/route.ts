import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { readDB, writeDB } from "@/lib/db";

/**
 * Creates a new user account
 * - Validates input
 * - Prevents duplicate email
 * - Hashes password before saving
 */
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const db = readDB();

  // Prevent duplicate accounts
  const existingUser = db.users.find((u: any) => u.email === email);
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  // Input validation helpers
  const isValidFullName = (name: string) =>
    name.trim().split(/\s+/).length >= 2;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  // Validate full name
  if (!isValidFullName(name)) {
    return NextResponse.json(
      { error: "Full name required (first and last name)" },
      { status: 400 }
    );
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Validate password strength
  if (!isValidPassword(password)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 chars, include upper, lower, number",
      },
      { status: 400 }
    );
  }

  // Hash password before storing (security)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate incremental user ID (u1, u2, u3...)
  const nextId =
    db.users.length > 0
      ? parseInt(db.users[db.users.length - 1].id.replace("u", "")) + 1
      : 1;

  const newUser = {
    id: `u${nextId}`,
    name,
    email,
    password: hashedPassword,
  };

  db.users.push(newUser);
  writeDB(db);

  return NextResponse.json({
    message: "User created",
    user: newUser,
  });
}
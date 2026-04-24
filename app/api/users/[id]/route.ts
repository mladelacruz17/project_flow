import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { readDB, writeDB } from "@/lib/db";
import { getSession } from "@/lib/session";
import type { User } from "@/types";

/**
 * GET USER BY ID
 * - Only returns user if authenticated
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getSession(req, NextResponse.next());

    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only allow user to view their own profile
    if (session.user.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const db = await readDB();

    const user = db.users.find((u: User) => u.id === id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET user error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/**
 * UPDATE USER PROFILE
 * - Allows name/email/password update
 * - Requires current password for security
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getSession(req, NextResponse.next());

    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prevent updating other users
    if (session.user.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();

    const db = await readDB();

    const userIndex = db.users.findIndex((u: User) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = db.users[userIndex];

    // Password update flow
    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Prevent duplicate email
    if (email && email !== user.email) {
      const emailExists = db.users.find((u: User) => u.email === email);

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }

      user.email = email;
    }

    if (name) user.name = name;

    db.users[userIndex] = user;
    await writeDB(db);

    return NextResponse.json({
      message: "User updated",
      user,
    });
  } catch (error) {
    console.error("PUT user error:", error);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
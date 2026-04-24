import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "@/types";

/**
 * Handles password reset:
 * - Verifies token (hashed)
 * - Checks token expiry
 * - Updates password securely
 * - Invalidates token after use
 */
export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    // Validate token input
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 6
    ) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const db = readDB();

    // Hash incoming token to compare with stored hashed token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with matching token and valid (non-expired) expiry
    const user = db.users.find(
      (u: User) =>
        u.resetToken === hashedToken &&
        u.resetTokenExpiry &&
        u.resetTokenExpiry > Date.now()
    );

    // If token is invalid or expired
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash new password before saving (bcrypt protects against brute-force attacks)
    user.password = await bcrypt.hash(newPassword, 10);

    // Invalidate token after successful reset to prevent reuse
    delete user.resetToken;
    delete user.resetTokenExpiry;

    writeDB(db);

    return NextResponse.json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
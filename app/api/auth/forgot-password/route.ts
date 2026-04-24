import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/email";
import { User } from "@/types";

/**
 * Handles forgot password request:
 * - Generates a secure reset token
 * - Stores hashed token + expiry
 * - Sends reset link via email
 */

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic validation to ensure email is provided
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 400 }
      );
    }

    const db = readDB();

    // Find user by email
    const user = db.users.find((u: User) => u.email === email);

    // Do not reveal if email exists (prevents email enumeration attacks)
    if (!user) {
      return NextResponse.json({
        message: "If email exists, reset link sent",
      });
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Hash token before storing (so raw token is never saved in DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Store hashed token and expiry (15 minutes)
    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15;

    writeDB(db);

    // Send email with raw token (used for verification later)
    await sendResetEmail(user.email, token);

    return NextResponse.json({
      message: "If email exists, reset link sent",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
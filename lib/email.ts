import { Resend } from "resend";

/**
 * Sends password reset email using Resend
 * Includes a tokenized reset link with expiration
 */

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to: string, token: string) {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // default test sender
      to,
      subject: "Reset your password",
      html: `
        <h2>Password Reset - PROJECTFLOW</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send reset email: ", err);
  }
}
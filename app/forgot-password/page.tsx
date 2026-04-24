"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";

import { Mail, Loader2, KanbanSquare, LogIn } from "lucide-react";

export default function ForgotPasswordPage() {
  // Form state
  const [email, setEmail] = useState("");

  // UI state (loading + feedback messages)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles forgot password request
   * - Sends email to backend
   * - Shows success message regardless of existence (security)
   */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Basic email validation before request
      if (!email.includes("@")) {
        setError("Please enter a valid email");
        return;
      }

      await axios.post("/forgot-password", { email });

      // Do NOT reveal if email exists (prevents user enumeration attacks)
      setSuccess("If this email exists, a reset link has been sent.");
    } catch (err: any) {
      // Handle API error safely
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 px-6">
      <div className="w-full max-w-md">

        {/* App branding / navigation */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <KanbanSquare className="w-8 h-8" />
          <Link href="/" className="text-xl font-semibold">
            PROJECT FLOW
          </Link>
        </div>

        <div className="rounded-2xl border bg-white/70 dark:bg-black/40 p-8 shadow-sm">

          <h1 className="text-xl font-semibold mb-2 text-center">
            Forgot Password
          </h1>
          <p className="text-sm text-zinc-500 text-center mb-6">
            Enter your email to receive a reset link
          </p>

          {/* Feedback messages */}
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          {success && <div className="text-green-500 text-sm mb-3">{success}</div>}

          {/* Email input */}
          <div className="mb-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 h-11">
              <Mail className="w-4 h-4 text-zinc-400" />
              <input
                className="w-full outline-none text-sm"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Submit button with loading state */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-2 hover:opacity-80 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Navigation back to login */}
          <p className="text-xs text-right mt-2">
            <Link href="/login" className="hover:underline flex justify-end gap-1">
              Back to login
              <LogIn className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
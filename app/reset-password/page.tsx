"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Link from "next/link";

import { Lock, Loader2, Eye, EyeClosed } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract reset token from URL
  const token = searchParams.get("token");

  // Form + UI state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Password validation rules
   * (must match backend for consistency)
   */
  const isValidPassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  /**
   * Handles password reset
   * - Validates password
   * - Sends token + new password to backend
   */
  const handleReset = async () => {
    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password does not meet requirements");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("/reset-password", {
        token,
        newPassword: password,
      });

      // Redirect after successful reset
      router.push("/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Reset failed";

      // Handle expired token case explicitly
      if (message.toLowerCase().includes("expired")) {
        setError("Your reset link has expired. Request a new one.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleReset();
  };

  // Early return if token is invalid
  if (!token) {
    return <p className="text-center mt-20">Invalid reset link</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-2xl">

        <h1 className="text-xl font-semibold mb-4 text-center">
          Reset Password
        </h1>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

        {/* Password input */}
        <div className="mb-4 flex items-center gap-2 border px-3 h-11 rounded-lg">
          <Lock className="w-4 h-4 text-zinc-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="w-full outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Toggle password visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 text-zinc-400 hover:text-zinc-700"
          >
            {showPassword ? (
              <EyeClosed className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Password requirements UI */}
        <div className="text-xs mt-2 space-y-1 text-zinc-500 flex justify-center gap-4">
          <div>
            <p className={password.length >= 8 ? "text-green-500" : ""}>
              • At least 8 characters
            </p>
            <p className={/[0-9]/.test(password) ? "text-green-500" : ""}>
              • One number
            </p>
          </div>
          <div>
            <p className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
              • One uppercase letter
            </p>
            <p className={/[a-z]/.test(password) ? "text-green-500" : ""}>
              • One lowercase letter
            </p>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleReset}
          disabled={loading || !isValidPassword(password)}
          className="w-full h-11 mt-2 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-2 hover:opacity-80 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Request new link */}
        <p className="text-xs text-right mt-2">
          <Link href="/forgot-password" className="hover:underline">
            Request New Link?
          </Link>
        </p>
      </div>
    </div>
  );
}
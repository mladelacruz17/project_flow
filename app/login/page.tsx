"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Link from "next/link";

import { LogIn, Mail, Lock, Loader2, UserPlus, KanbanSquare, Eye, EyeClosed } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state (loading + error)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles login request
   * - Validates input
   * - Sends credentials to backend
   * - Redirects on success
   */
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Basic validation before API call
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }

      await axios.post("/login", { email, password });

      // Redirect after successful login
      router.push("/projects");
    } catch (err: any) {
      // Handle API error safely
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to submit form
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 px-6">

      <div className="w-full max-w-md">

        {/* App branding */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
            <KanbanSquare className="w-8 h-8" />
            <Link href="/" className="text-xl font-semibold tracking-tight">
              PROJECT FLOW
            </Link>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/40 backdrop-blur p-8 shadow-sm">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-zinc-900 dark:text-white mb-2">
              <LogIn className="w-5 h-5" />
              <h1 className="text-xl font-semibold">Welcome back</h1>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Login to continue to Project Flow
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded-lg border border-red-200 dark:border-red-900">
              {error}
            </div>
          )}

          {/* Email input */}
          <div className="mb-3">
            <label className="text-xs text-zinc-500">Email</label>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 h-11 bg-white dark:bg-zinc-950 focus-within:ring-2 focus-within:ring-zinc-400">
              <Mail className="w-4 h-4 text-zinc-400" />
              <input
                type="email"
                className="w-full bg-transparent outline-none text-sm"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label className="text-xs text-zinc-500">Password</label>
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 h-11 bg-white dark:bg-zinc-950 focus-within:ring-2 focus-within:ring-zinc-400">
              <Lock className="w-4 h-4 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="••••••••"
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

            <p className="text-xs text-right mt-2">
              <Link href="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </p>
          </div>

          {/* Submit button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-11 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-2 hover:opacity-80 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-sm text-center mt-5 text-zinc-500">
            No account yet?{" "}
            <Link
              href="/signup"
              className="text-zinc-900 dark:text-white hover:underline inline-flex items-center gap-1"
            >
              Sign up <UserPlus className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
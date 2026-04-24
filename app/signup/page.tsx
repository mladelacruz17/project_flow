"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  User,
  Mail,
  Lock,
  Loader2,
  UserPlus,
  LogIn,
  KanbanSquare,
  Eye,
  EyeClosed,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Field-level validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /**
   * Validation rules (should match backend)
   */
  const isValidFullName = (name: string) =>
    name.trim().split(/\s+/).length >= 2;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  /**
   * Real-time validation handlers
   */
  const handleNameChange = (value: string) => {
    setName(value);

    if (!value) return setNameError("");
    if (!isValidFullName(value)) return setNameError("Enter first and last name");

    setNameError("");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (!value) return setEmailError("");
    if (!isValidEmail(value)) return setEmailError("Invalid email format");

    setEmailError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!value) return setPasswordError("");
    if (!isValidPassword(value))
      return setPasswordError("Password does not meet requirements");

    setPasswordError("");
  };

  /**
   * Handles signup request
   * - Final validation
   * - Sends data to backend
   * - Redirects on success
   */
  const handleSignup = async () => {
    if (nameError || emailError || passwordError) return;

    if (!isValidFullName(name)) return setNameError("Enter full name");
    if (!isValidEmail(email)) return setEmailError("Invalid email");
    if (!isValidPassword(password)) return setPasswordError("Weak password");

    try {
      setLoading(true);
      setError("");

      await axios.post("/users", { name, email, password });

      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSignup();
  };

  const hasErrors = !!nameError || !!emailError || !!passwordError;

  const isFormInvalid = !name || !email || !password || hasErrors;

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

        {/* Signup Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/40 backdrop-blur p-8 shadow-sm">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserPlus className="w-5 h-5" />
              <h1 className="text-xl font-semibold">Create account</h1>
            </div>
            <p className="text-sm text-zinc-500">
              Start managing your projects with Project Flow
            </p>
          </div>

          {/* Global error */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded-lg border">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="mb-3">
            <label className="text-xs text-zinc-500">Name</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 h-11">
              <User className="w-4 h-4 text-zinc-400" />
              <input
                className="w-full outline-none text-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-xs text-zinc-500">Email</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 h-11">
              <Mail className="w-4 h-4 text-zinc-400" />
              <input
                type="email"
                className="w-full outline-none text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-xs text-zinc-500">Password</label>

            <div className="flex items-center gap-2 border rounded-lg px-3 h-11">
              <Lock className="w-4 h-4 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full outline-none text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-zinc-400 hover:text-zinc-700"
              >
                {showPassword ? <EyeClosed className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password requirements */}
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
          </div>

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading || isFormInvalid}
            className="w-full h-11 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-2 hover:opacity-80 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Account
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-sm text-center mt-5 text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="hover:underline inline-flex items-center gap-1">
              Login <LogIn className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
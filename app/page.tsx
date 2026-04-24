"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import LoadingScreen from "@/components/ui/LoadingScreen";

import { LogIn, UserPlus, KanbanSquare } from "lucide-react";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * Check session on load.
   * If user is already authenticated, redirect to dashboard.
   * Otherwise, show landing page.
   */
  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await axios.get("/session");

        if (res.data.user) {
          router.replace("/projects");
          return;
        }
      } catch (err) {
        // Fail silently — treat as not authenticated
        console.error("Session check failed", err);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, [router]);

  // Show loading screen while session check is in progress
  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 px-6">
      <main className="w-full max-w-4xl text-center flex flex-col items-center gap-10">

        {/* App branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
            <KanbanSquare className="w-8 h-8" />
            <span className="text-xl font-semibold tracking-tight">
              PROJECT FLOW
            </span>
          </div>

          <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm sm:text-base">
            A simple and smooth way to manage tasks, projects, and deadlines in one flow.
          </p>
        </div>

        {/* Hero section */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Organize work.
            <br />
            Deliver faster.
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            A lightweight project management system built for focus, speed, and clarity.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
          >
            Log In
            <LogIn className="w-4 h-4" />
          </Link>

          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 px-6 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Link>
        </div>

        {/* Feature highlight */}
        <div className="mt-10 w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-black/40 backdrop-blur">
          <p className="text-sm text-zinc-500">
            Clean kanban boards • Deadlines • Activity logs
          </p>
        </div>

      </main>
    </div>
  );
}
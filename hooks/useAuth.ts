"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

/**
 * useAuth 
 * Handles session authentication check on mount.
 * Redirects to home page if user is not authenticated.
 */
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const res = await axios.get("/session");

      if (!res.data.user) {
        router.replace("/");
        return;
      }

      setUser(res.data.user);
      setAuthChecked(true);
    };

    getSession();
  }, []);

  return { user, authChecked };
}
"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "@/lib/axios";
import { User, Project } from "@/types";

/**
 * useProjects
 *
 * Fetches and manages projects for the authenticated user.
 * Handles project selection persistence and fallback.
 */
export function useProjects(user: User | null) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await axios.get("/projects");
      setProjects(res.data);

      setSelectedProject((prev) => {
        if (prev) {
          const stillExists = res.data.find((p: any) => p.id === prev.id);
          return stillExists || res.data[0];
        }
        return res.data[0];
      });
    } catch (err) {
      console.error("Failed to fetch projects", err);
      setProjects([]);
      setSelectedProject(null);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        await fetchProjects();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  return {
    projects,
    selectedProject,
    setSelectedProject,
    fetchProjects,
    loading,
  };
}
"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Project } from "@/types";
import { X, Save, Pencil } from "lucide-react";
import FloatingField from "../ui/FloatingField";
import LoadingScreen from "../ui/LoadingScreen";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  project?: Project | null;
  refreshProjects: () => void;
  setSelectedProject: (project: Project) => void;
}

/**
 * ProjectsModal
 *
 * Handles creating and editing projects.
 * Uses optimistic UI updates and shows loading state while saving.
 */
export default function ProjectsModal({
  isOpen,
  onClose,
  isEditMode,
  project,
  refreshProjects,
  setSelectedProject,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isSavingProject, setIsSavingProject] = useState(false);

  useEffect(() => {
    if (!isEditMode || !project) {
      setName("");
      setDescription("");
      setDeadline("");
      return;
    }

    setName(project.name);
    setDescription(project.description || "");
    setDeadline(project.deadline || "");
  }, [isEditMode, project]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (isSavingProject) return;

    setIsSavingProject(true);

    try {
      let res;

      if (isEditMode && project) {
        res = await axios.put(`/projects/${project.id}`, {
          name,
          description,
          deadline,
        });

        setSelectedProject(res.data);
      } else {
        res = await axios.post("/projects", {
          name,
          description,
          deadline,
        });

        setSelectedProject(res.data);
      }

      refreshProjects();
      onClose();
    } catch (err) {
      console.error("Failed to save project", err);
    } finally {
      setIsSavingProject(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"

      onClick={() => {
        if (!isSavingProject) onClose();
      }}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[420px] rounded-2xl border border-zinc-200 dark:border-zinc-700
                      bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl
                      shadow-2xl p-5 text-black dark:text-white">

        {/* Loading Overlay */}
        {isSavingProject && (
          <LoadingScreen
            text={isEditMode ? "Updating project..." : "Creating project..."}
            fullScreen={true}
          />
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">

          <div className="flex items-center gap-2">
            {isEditMode ? (
              <Pencil className="w-5 h-5 text-blue-500" />
            ) : (
              <Save className="w-5 h-5 text-blue-500" />
            )}

            <h2 className="font-semibold text-lg">
              {isEditMode ? "Edit Project" : "Create Project"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3">

          <div className="relative mb-2">
            <FloatingField label="Project Name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/60 dark:bg-zinc-900/40
                          border border-zinc-200 dark:border-zinc-700
                          rounded-lg p-2 text-sm outline-none
                          focus:ring-2 focus:ring-blue-500"
              />
            </FloatingField>
          </div>

          <div className="relative">
            <FloatingField label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[90px]
                          bg-white/60 dark:bg-zinc-900/40
                          border border-zinc-200 dark:border-zinc-700
                          rounded-lg p-2 text-sm outline-none
                          focus:ring-2 focus:ring-blue-500"
              />
            </FloatingField>
          </div>

          <div className="relative">
            <FloatingField label="Deadline">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white/60 dark:bg-zinc-900/40
                          border border-zinc-200 dark:border-zinc-700
                          rounded-lg p-2 text-sm outline-none
                          focus:ring-2 focus:ring-blue-500"
              />
            </FloatingField>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            disabled={isSavingProject}
            className="px-3 py-1.5 rounded-lg text-sm
                      bg-white/60 dark:bg-zinc-900/40
                      border border-zinc-200 dark:border-zinc-700
                      hover:bg-white dark:hover:bg-zinc-800 transition
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSavingProject}
            className="px-3 py-1.5 rounded-lg text-sm
                      bg-blue-500 hover:bg-blue-600 text-white transition
                      disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSavingProject
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update"
                : "Create"}
          </button>

        </div>
      </div>
    </div>
  );
}
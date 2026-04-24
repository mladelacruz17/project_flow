"use client";

import { useState, useMemo } from "react";
import { Project } from "@/types";
import { Plus, LogOut, Trash2, Calendar, KanbanSquare } from "lucide-react";
import { getDeadlineStatus } from "@/utils/deadlineStatus";
import UserModal from "@/components/user/UserModal";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface Props {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  user: any;
  onAdd: () => void;
  onLogout: () => Promise<void>;
  onDelete: (project: Project) => void;
}

/**
 * Sidebar handles:
 * - project navigation
 * - search + sorting
 * - user actions (logout, profile edit)
 */
export default function Sidebar({
  projects,
  selectedProject,
  setSelectedProject,
  user,
  onAdd,
  onLogout,
  onDelete,
}: Props) {
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const [search, setSearch] = useState("");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  /**
   * Toggle deadline sorting order:
   * none → asc → desc → none
   */
  const toggleSort = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  /**
   * Reset sorting when user searches
   * (prevents conflicting UI states)
   */
  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim() !== "") setSortOrder("none");
  };

  // Filter projects by name
  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  // Sort projects by deadline
  const displayedProjects = useMemo(() => {
    const list = [...filteredProjects];

    if (sortOrder === "none") return list;

    return list.sort((a, b) => {
      const dateA = a.deadline
        ? new Date(a.deadline).getTime()
        : Infinity;
      const dateB = b.deadline
        ? new Date(b.deadline).getTime()
        : Infinity;

      return sortOrder === "asc"
        ? dateA - dateB
        : dateB - dateA;
    });
  }, [filteredProjects, sortOrder]);

  // Map deadline status → color dot
  const getStatusColor = (type: string) => {
    switch (type) {
      case "today":
        return "bg-green-500";
      case "overdue":
        return "bg-red-500";
      case "near":
        return "bg-yellow-400";
      default:
        return "bg-zinc-400";
    }
  };

  return (
    <div className="w-64 flex flex-col p-4 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800">

      {/* App branding */}
      <div className="flex items-center gap-2 mb-5">
        <KanbanSquare className="w-full h-full" />
        <h2 className="text-xl font-semibold tracking-[0.3em]">
          PROJECT FLOW
        </h2>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg w-full bg-blue-100 hover:bg-blue-300 text-black transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>

        <button
          title="Sort Deadline"
          onClick={toggleSort}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg w-full
            bg-zinc-100 hover:bg-zinc-200 text-zinc-700
            dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300
            transition"
        >
          <Calendar className="w-4 h-4" />
          {sortOrder === "none"
            ? "Sort"
            : sortOrder === "asc"
              ? "↑"
              : "↓"}
        </button>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="mt-3 mb-4 px-3 py-2 rounded-lg w-full outline-none text-sm
          bg-zinc-100 text-zinc-900 placeholder:text-zinc-400
          focus:ring-2 focus:ring-blue-400
          dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />

      {/* Project list */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {displayedProjects.map((p) => {
          const status = getDeadlineStatus(p.deadline);

          return (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition
              ${selectedProject?.id === p.id
                  ? "bg-blue-100 dark:bg-blue-500/20"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    status.type
                  )}`}
                />
                <span className="text-sm">{p.name}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(p);
                }}
                className="p-1 rounded hover:bg-red-500/20 transition"
              >
                <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
              </button>
            </div>
          );
        })}
      </div>

      {/* User section */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm">Hi, {user?.name}</p>

        <button
          onClick={() => setIsUserModalOpen(true)}
          className="text-xs text-blue-500 hover:underline mt-1"
        >
          Edit Profile
        </button>

        <button
          onClick={() => setIsLogoutOpen(true)}
          className="mt-3 px-3 py-2 rounded-lg w-full
            bg-red-500 hover:bg-red-600 text-white transition"
        >
          <LogOut className="w-4 h-4 inline" /> Log out
        </button>
      </div>

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        userId={user.id}
      />

      <ConfirmModal
        open={isLogoutOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        icon={<LogOut className="w-4 h-4" />}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={async () => {
          await onLogout();
          setIsLogoutOpen(false);
        }}
      />
    </div>
  );
}
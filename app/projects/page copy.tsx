"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { Calendar } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";

import Sidebar from "@/components/projects/Sidebar";
import Topbar from "@/components/projects/Topbar";
import KanbanBoard from "@/components/projects/KanbanBoard";
import TaskPanel from "@/components/projects/TaskPanel";
import HistorySidebar from "@/components/projects/HistorySidebar";

import ProjectsModal from "@/components/projects/ProjectsModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ProjectsSkeleton from "@/components/projects/ProjectsSkeleton";

import { formatDate } from "@/utils/formatDate";
import { getDeadlineStatus } from "@/utils/deadlineStatus";

import { Task, Log } from "@/types";

export default function ProjectsPage() {
  const router = useRouter();

  // Auth state (ensures user is loaded before rendering)
  const { user, authChecked } = useAuth();

  // Project state (centralized via custom hook)
  const {
    projects,
    selectedProject,
    setSelectedProject,
    fetchProjects,
    loading,
  } = useProjects(user);

  // UI states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Data states (tasks + logs per project)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  // Shared delete modal state (task OR project)
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    type: "task" | "project";
    name: string;
  } | null>(null);

  /**
   * Fetch tasks for selected project
   * Runs whenever selectedProject changes
   */
  const fetchTasks = useCallback(async () => {
    if (!selectedProject) return;

    try {
      const res = await axios.get(`/tasks?projectId=${selectedProject.id}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  }, [selectedProject]);

  /**
   * Fetch activity logs (history panel)
   * Only triggered when history is opened
   */
  const fetchLogs = useCallback(async () => {
    if (!selectedProject) return;

    try {
      const res = await axios.get(`/logs?projectId=${selectedProject.id}`);
      setLogs(res.data.reverse()); // latest first
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  }, [selectedProject]);

  /**
   * Refetch tasks when project changes
   * Also clears selected task to avoid mismatch
   */
  useEffect(() => {
    fetchTasks();
    setSelectedTask(null);
  }, [fetchTasks]);

  /**
   * Load logs only when history sidebar is opened
   */
  useEffect(() => {
    if (showHistory) fetchLogs();
  }, [showHistory, fetchLogs]);

  /**
   * Auto-open project modal if user has no projects
   */
  useEffect(() => {
    if (!loading && projects.length === 0) {
      setShowProjectModal(true);
    }
  }, [projects.length, loading]);

  /**
   * Logout handler
   */
  const handleLogout = async () => {
    await axios.post("/logout");
    router.push("/login");
  };

  // Show skeleton while auth or projects are loading
  if (!authChecked || loading) return <ProjectsSkeleton />;

  const status = getDeadlineStatus(selectedProject?.deadline);

  return (
    <div className="flex h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950">

      {/* Sidebar: project navigation + actions */}
      <Sidebar
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        user={user}
        onAdd={() => {
          setIsEditMode(false);
          setShowProjectModal(true);
        }}
        onLogout={handleLogout}
        onDelete={(project) =>
          setDeleteItem({
            id: project.id,
            type: "project",
            name: project.name,
          })
        }
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar: project title + actions */}
        <Topbar
          project={selectedProject}
          onEdit={() => {
            setIsEditMode(true);
            setShowProjectModal(true);
          }}
          onHistory={() => setShowHistory(true)}
        />

        {/* Description + Deadline badge */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/20 backdrop-blur">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {selectedProject?.description}
          </p>

          <div
            title="Deadline"
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition
              ${status.type === "today"
                ? "bg-green-600 text-white"
                : status.type === "overdue"
                  ? "bg-red-600 text-white"
                  : status.type === "near"
                    ? "bg-yellow-500 text-black"
                    : status.type === "ok"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                      : "bg-zinc-700 text-white"
              }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            {selectedProject?.deadline
              ? formatDate(selectedProject.deadline)
              : "No Deadline"}
          </div>
        </div>

        {/* Kanban board */}
        <KanbanBoard
          tasks={tasks}
          selectedTask={selectedTask}
          setTasks={setTasks}
          setSelectedTask={setSelectedTask}
          setDeleteItem={setDeleteItem}
          refreshLogs={fetchLogs}
        />

        {/* Task details panel */}
        <TaskPanel
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          project={selectedProject}
          refreshTasks={fetchTasks}
          refreshLogs={fetchLogs}
        />
      </div>

      {/* Activity history sidebar */}
      <HistorySidebar
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        logs={logs}
      />

      {/* Project modal (create/edit) */}
      <ProjectsModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        isEditMode={isEditMode}
        project={selectedProject}
        refreshProjects={fetchProjects}
        setSelectedProject={setSelectedProject}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        open={!!deleteItem}
        message={`"${deleteItem?.name}" will be permanently removed.`}
        onCancel={() => setDeleteItem(null)}
        onConfirm={async () => {
          if (!deleteItem) return;

          if (deleteItem.type === "task") {
            await axios.delete(`/tasks/${deleteItem.id}`);
            setTasks((prev) => prev.filter((t) => t.id !== deleteItem.id));
            setSelectedTask((prev) =>
              prev?.id === deleteItem.id ? null : prev
            );
            fetchLogs();
          }

          if (deleteItem.type === "project") {
            await axios.delete(`/projects/${deleteItem.id}`);
            await fetchProjects();
            setSelectedProject(null);
            setTasks([]);
            fetchLogs();
          }

          setDeleteItem(null);
        }}
      />
    </div>
  );
}
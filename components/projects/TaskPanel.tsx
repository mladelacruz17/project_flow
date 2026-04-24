import { Task, Project, Status, Priority } from "@/types";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import FloatingField from "@/components/ui/FloatingField";

interface Props {
  selectedTask: Task | null;
  project?: Project | null;
  refreshTasks: () => void;
  refreshLogs: () => void;
  setSelectedTask: (task: Task | null) => void;
}

/**
 * TaskPanel handles:
 * - creating new tasks
 * - editing existing tasks
 * - updating task status
 */
export default function TaskPanel({
  selectedTask,
  project,
  refreshTasks,
  setSelectedTask,
  refreshLogs,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("None");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  const [status, setStatus] = useState<Status>("To Do");
  const statuses: Status[] = ["To Do", "In Progress", "Done"];
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Populate form when selecting a task
   * Clear form when switching to "new task"
   */
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || "");
      setDescription(selectedTask.description || "");
      setPriority(selectedTask.priority || "None");
      setDueDate(selectedTask.dueDate || "");
      setTags(selectedTask.tags?.join(", ") || "");
      setStatus(selectedTask.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("None");
      setDueDate("");
      setTags("");
    }
  }, [selectedTask]);

  /**
   * Save or update task
   */
  const saveTask = async () => {
    if (!title.trim() || isSaving) return;

    setIsSaving(true);

    try {
      if (selectedTask) {
        await axios.put(`/tasks/${selectedTask.id}`, {
          title,
          description,
          priority,
          dueDate: dueDate || undefined,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        });
      } else {
        const res = await axios.post(`/tasks`, {
          title,
          description,
          priority,
          dueDate: dueDate || undefined,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
          projectId: project?.id,
        });

        setSelectedTask(res.data);
      }

      refreshTasks();
      setTimeout(() => refreshLogs(), 100);
    } catch (err) {
      console.error("Failed to save task", err);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Update only task status
   */
  const updateStatus = async (newStatus: Status) => {
    if (!selectedTask || isSaving) return;

    setIsSaving(true);
    setStatus(newStatus);
    setIsEditingStatus(false);

    try {
      await axios.put(`/tasks/${selectedTask.id}`, {
        status: newStatus,
      });

      refreshTasks();
      setTimeout(() => refreshLogs(), 100);
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Format dates consistently
  const formatDate = (date: string) =>
    new Date(date).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const noProject = !project;

  return (
    <div className="relative flex flex-1 border-t border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/20 backdrop-blur-xl p-4 text-black dark:text-white min-h-[120px] overflow-y-auto">

      {/* Loading overlay blocks interaction during API calls */}
      {isSaving && (
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-zinc-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              {selectedTask ? "Updating Task..." : "Saving Task..."}
            </p>
          </div>
        </div>
      )}

      {noProject ? (
        <div className="flex flex-col items-center justify-center h-full text-zinc-500">
          <p className="text-sm">Please select or create a project to create tasks</p>
        </div>
      ) : (

        <div className="w-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">

            <div className="flex items-center gap-2">
              {selectedTask ? (
                <div className="relative">

                  {/* STATUS SELECTOR */}
                  <button
                    onClick={() => setIsEditingStatus(!isEditingStatus)}
                    className={`px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-sm transition
                              ${status === "To Do" ? "bg-blue-500 text-white"
                        : status === "In Progress" ? "bg-yellow-500 text-black"
                          : "bg-green-500 text-white"
                      }`}
                  >
                    {status}
                    <span className="text-[10px] opacity-70">▼</span>
                  </button>

                  {/* DROPDOWN */}
                  {isEditingStatus && (
                    <div className="absolute mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg overflow-hidden z-10">
                      {statuses.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(s)}
                          className="block px-3 py-2 text-left w-full text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <h2 className="font-semibold text-zinc-800 dark:text-white">
                  Add New Task
                </h2>
              )}
            </div>

            <div>
              {selectedTask && (
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition"
                >
                  + New Task
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">

            {/* LEFT */}
            <div className="flex flex-col gap-2">
              <FloatingField label="Title">
                <input
                  type="text"
                  placeholder="Task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                />
              </FloatingField>

              <FloatingField label="Tags">
                <input
                  type="text"
                  placeholder="Comma separated..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FloatingField>
            </div>

            {/* CENTER */}
            <FloatingField label="Description">
              <textarea
                placeholder="Write details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-full min-h-[90px] bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FloatingField>

            {/* RIGHT */}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <FloatingField label="Priority">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-sm"
                  >
                    <option value="None">No Priority</option>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </FloatingField>

                <FloatingField label="Due Date">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FloatingField>
              </div>

              {/* ACTION BUTTON */}
              <button
                onClick={saveTask}
                disabled={isSaving}
                className="mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving
                  ? selectedTask
                    ? "Updating..."
                    : "Saving..."
                  : selectedTask
                    ? "Update Task"
                    : "Save Task"}
              </button>
            </div>
          </div>

          {/* FOOTER META */}
          {selectedTask && (
            <div className="mt-3 border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between text-[11px] text-zinc-500">
              <span>Created: {formatDate(selectedTask.createdAt)}</span>
              <span>
                {selectedTask.updatedAt
                  ? `Updated: ${formatDate(selectedTask.updatedAt)}`
                  : "Not updated"}
              </span>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
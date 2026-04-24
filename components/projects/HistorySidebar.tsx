"use client";

import { Plus, Edit, Trash2, X } from "lucide-react";
import type { Log, LogAction } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  logs: Log[];
}

/**
 * Returns icon based on log action type.
 */
function getLogIcon(action: LogAction) {
  switch (action) {
    case "create":
      return <Plus className="w-4 h-4 text-green-500" />;
    case "update":
    case "move":
      return <Edit className="w-4 h-4 text-blue-500" />;
    case "delete":
      return <Trash2 className="w-4 h-4 text-red-500" />;
    default:
      return <Edit className="w-4 h-4 text-zinc-400" />;
  }
}

/**
 * Returns left border color based on log type.
 */
function getBorder(action: LogAction) {
  switch (action) {
    case "create":
      return "border-green-500/70";
    case "delete":
      return "border-red-500/70";
    default:
      return "border-blue-500/70";
  }
}

/**
 * History Sidebar shows project change logs
 */
export default function HistorySidebar({
  isOpen,
  onClose,
  logs,
}: Props) {

  // Do not render sidebar when closed (avoids unnecessary DOM work)
  if (!isOpen) return null;

  return (
    <div className="w-80 h-full flex flex-col border-l border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/40 backdrop-blur shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="font-semibold text-zinc-900 dark:text-white">
          History
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          <X className="w-4 h-4 text-zinc-500" />
        </button>
      </div>

      {/* Activity list */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1">

        {logs.length === 0 && (
          <p className="text-sm text-zinc-400">
            No activity yet
          </p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className={`flex gap-3 border-l-2 pl-3 pb-3 ${getBorder(log.action)}`}
          >
            <div className="mt-0.5">
              {getLogIcon(log.action)}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                {log.message}
              </p>

              {/* Show movement details only when both values exist */}
              {log.meta?.from && log.meta?.to && (
                <p className="text-xs text-zinc-500 mt-1">
                  {log.meta.from} → {log.meta.to}
                </p>
              )}

              <p className="text-xs text-zinc-400 mt-1">
                {formatDateTime(log.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Formats ISO date string into readable timestamp.
 */
function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
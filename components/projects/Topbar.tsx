import { Project } from "@/types";
import { Pencil, History } from "lucide-react";

interface Props {
  project: Project | null;
  onEdit: () => void;
  onHistory: () => void;
}

/**
 * Topbar displays the active project
 * and provides quick actions (edit, history)
 */
export default function Topbar({ project, onEdit, onHistory }: Props) {
  const disabled = !project;

  return (
    <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/20 backdrop-blur-xl text-black dark:text-white">

      <h1 className="font-semibold text-lg tracking-tight">
        {project?.name || "No Project Selected"}
      </h1>

      <div className="flex items-center gap-2">

        <button
          title="Edit Project"
          onClick={onEdit}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                     bg-zinc-900 text-white hover:bg-zinc-800
                     dark:bg-white dark:text-black dark:hover:bg-zinc-200
                     transition cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>

        <button
          title="View History"
          onClick={onHistory}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                     bg-white/60 dark:bg-zinc-900/40
                     border border-zinc-200 dark:border-zinc-700
                     hover:bg-white dark:hover:bg-zinc-800 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <History className="w-4 h-4" />
          History
        </button>

      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Trash2, X, Loader2 } from "lucide-react";
import LoadingScreen from "./LoadingScreen";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  icon?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}

/**
 * ConfirmModal
 *
 * Reusable confirmation dialog with async support.
 * Shows loading overlay while processing actions.
 */
export default function ConfirmModal({
  open,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  icon = <Trash2 className="w-5 h-5 text-red-500" />,
  onCancel,
  onConfirm,
}: Props) {
  const [loading, setLoading] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) {
        onCancel();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [open, loading, onCancel]);

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (!loading) onCancel();
      }}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[340px] rounded-2xl border border-zinc-200 dark:border-zinc-700
                bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl p-5
                text-black dark:text-white shadow-xl overflow-hidden"
      >
        {/* Loading Overlay */}
        {loading && <LoadingScreen text="Processing..." fullScreen={true} />}

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h2 className="font-semibold">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-5">
          {message}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            disabled={loading}
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm
                       bg-white/60 dark:bg-zinc-900/40
                       border border-zinc-200 dark:border-zinc-700
                       hover:bg-white dark:hover:bg-zinc-800 transition
                       disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleConfirm}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm
                       bg-red-500 hover:bg-red-600 text-white transition
                       disabled:opacity-60 disabled:cursor-not-allowed min-w-[90px]"
          >
            {icon}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
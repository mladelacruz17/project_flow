"use client";

interface Props {
  text?: string;
  fullScreen?: boolean;
}

/**
 * LoadingScreen
 *
 * Reusable loading UI with animated spinner.
 * Can be used as a full-page loader or inline loader.
 */
export default function LoadingScreen({
  text = "Loading...",
  fullScreen = true,
}: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        flex items-center justify-center
        ${fullScreen ? "fixed inset-0 z-[9999]" : "w-full h-full"}
        bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm
      `}
    >
      {/* Loader Card */}
      <div
        className="
          flex flex-col items-center gap-4
          px-6 py-5 rounded-2xl
          bg-white/70 dark:bg-black/20
          backdrop-blur-xl
          border border-zinc-200 dark:border-zinc-800
          shadow-sm
        "
      >
        {/* Spinner */}
        <div className="relative w-10 h-10">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800" />

          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500 animate-spin" />

          {/* Pulse center */}
          <div className="absolute inset-2 rounded-full bg-blue-500/20 dark:bg-blue-400/20 animate-pulse" />
        </div>

        {/* Text */}
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {text}
        </p>
      </div>
    </div>
  );
}
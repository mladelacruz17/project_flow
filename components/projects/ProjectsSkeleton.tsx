/**
 * ProjectsSkeleton
 *
 * Full-page loading skeleton for Projects dashboard.
 * Mimics sidebar, kanban board, and detail panel layout.
 */
export default function ProjectsSkeleton() {
  const sidebarItems = 6;
  const kanbanCols = 3;
  const cardsPerCol = 4;

  return (
    <div className="flex h-screen overflow-hidden animate-pulse bg-zinc-50 dark:bg-zinc-950">

      {/* Sidebar */}
      <div className="w-64 flex flex-col p-4 space-y-4
                      bg-white/70 dark:bg-black/20
                      backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800">

        <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />

        <div className="space-y-2 flex-1">
          {Array.from({ length: sidebarItems }).map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-lg
                         bg-white/60 dark:bg-zinc-900/40
                         border border-zinc-200 dark:border-zinc-800"
            />
          ))}
        </div>

        <div className="h-10 rounded-lg bg-blue-200/40 dark:bg-blue-900/30" />
        <div className="h-5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="flex justify-between items-center px-5 py-3
                        border-b border-zinc-200 dark:border-zinc-800
                        bg-white/70 dark:bg-black/20 backdrop-blur-xl">

          <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />

          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-3 gap-4 p-4 flex-1">

          {Array.from({ length: kanbanCols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="rounded-2xl p-3 space-y-3
                         bg-white/60 dark:bg-zinc-900/30
                         border border-zinc-200 dark:border-zinc-800
                         backdrop-blur-xl"
            >
              {/* Column title */}
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />

              {/* Cards */}
              {Array.from({ length: cardsPerCol }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl
                             bg-white/70 dark:bg-zinc-900/40
                             border border-zinc-200 dark:border-zinc-800"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Task Panel */}
        <div className="border-t border-zinc-200 dark:border-zinc-800
                        bg-white/70 dark:bg-black/20 backdrop-blur-xl
                        p-4 h-48 space-y-3">

          <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-10 rounded-lg bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800" />
          <div className="h-8 w-24 rounded-lg bg-blue-200/40 dark:bg-blue-900/30" />
        </div>

      </div>

      {/* History Sidebar */}
      <div className="w-80 p-4 space-y-3
                      bg-white/70 dark:bg-black/20
                      backdrop-blur-xl border-l border-zinc-200 dark:border-zinc-800">

        <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />

        {Array.from({ length: sidebarItems }).map((_, i) => (
          <div
            key={i}
            className="space-y-2 p-3 rounded-xl
                       bg-white/60 dark:bg-zinc-900/40
                       border border-zinc-200 dark:border-zinc-800"
          >
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded" />
          </div>
        ))}

      </div>
    </div>
  );
}
type DeadlineStatus =
  | { label: "No Deadline"; type: "none" }
  | { label: "Today"; type: "today" }
  | { label: "Overdue"; type: "overdue" }
  | { label: "Due Soon"; type: "near" }
  | { label: "On Track"; type: "ok" }
  | { label: "Invalid Date"; type: "none" };

const NEAR_DUE_DAYS = 30;

/**
 * Determines deadline status label and type
 * Used for UI badges (kanban, task cards, etc.)
 */
export function getDeadlineStatus(deadline?: string): DeadlineStatus {
  if (!deadline) {
    return { label: "No Deadline", type: "none" };
  }

  const now = new Date();
  const d = new Date(deadline);

  if (isNaN(d.getTime())) {
    return { label: "Invalid Date", type: "none" };
  }

  const diffDays = Math.ceil(
    (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const isToday = d.toDateString() === now.toDateString();
  const isOverdue = d < now && !isToday;
  const isNearDue = diffDays > 0 && diffDays <= NEAR_DUE_DAYS;

  if (isToday) return { label: "Today", type: "today" };
  if (isOverdue) return { label: "Overdue", type: "overdue" };
  if (isNearDue) return { label: "Due Soon", type: "near" };

  return { label: "On Track", type: "ok" };
}
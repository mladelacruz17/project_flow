import { readDB, writeDB } from "@/lib/db";
import { Log, LogEntity, LogAction } from "@/types";

/**
 * Adds an activity log entry to the database
 * Used for tracking task/project actions (create, update, move, delete)
 */
export async function addLog({
  userId,
  projectId,
  taskId,
  entity,
  action,
  message,
  meta = {},
}: {
  userId: string;
  projectId: string;
  taskId?: string;
  entity: LogEntity;
  action: LogAction;
  message: string;
  meta?: Record<string, unknown>;
}) {
  const db = await readDB();

  db.logs = db.logs || [];

  // Generate incremental log ID (l1, l2, l3...)
  const nextId =
    "l" +
    (db.logs?.length > 0
      ? Math.max(
        ...db.logs.map((l: Log) => {
          const num = Number(l.id.replace("l", ""));
          return isNaN(num) ? 0 : num;
        })
      ) + 1
      : 1);

  const log: Log = {
    id: nextId,
    userId,
    projectId,
    taskId,
    entity,
    action,
    message,
    meta,
    createdAt: new Date().toISOString(),
  };

  db.logs.push(log);

  try {
    writeDB(db);
  } catch (err) {
    console.error("Failed to write log:", err);
  }
}
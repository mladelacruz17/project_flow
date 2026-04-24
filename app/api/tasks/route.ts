import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { addLog } from "@/lib/logger";
import { getSession } from "@/lib/session";
import type { Task, Project } from "@/types";

/**
 * Fetch tasks (optionally filtered by projectId)
 * - Requires authentication
 * - Enforces project ownership when filtering by projectId
 */
export async function GET(req: Request) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const db = await readDB();
  let tasks: Task[] = db.tasks || [];

  // If filtering by project, ensure user owns the project
  if (projectId) {
    const project = db.projects.find(
      (p: Project) => p.id === projectId && p.userId === user.id
    );

    if (!project) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    tasks = tasks.filter((t: Task) => t.projectId === projectId);
  }

  return NextResponse.json(tasks);
}

/**
 * Create a new task under a project
 * - Requires authentication
 * - Ensures required fields exist
 * - Logs creation for audit history
 */
export async function POST(req: Request) {
  const res = new NextResponse();
  const session = await getSession(req, res);

  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  const { title, description, priority, dueDate, tags, projectId } =
    await req.json();

  if (!title || !projectId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const db = await readDB();

  // Ensure project exists and belongs to user
  const project = db.projects.find(
    (p: Project) => p.id === projectId && p.userId === user.id
  );

  if (!project) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const nextId =
    "t" +
    (db.tasks.length > 0
      ? Math.max(...db.tasks.map((t: Task) => Number(t.id.slice(1)))) + 1
      : 1);

  const newTask: Task = {
    id: nextId,
    projectId,
    title,
    description,
    priority,
    dueDate,
    tags,
    status: "To Do",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.tasks.push(newTask);
  await writeDB(db);

  await addLog({
    userId: user.id,
    projectId,
    taskId: nextId,
    entity: "task",
    action: "create",
    message: `Task "${title}" created`,
  });

  return NextResponse.json(newTask);
}
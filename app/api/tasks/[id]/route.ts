import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { addLog } from "@/lib/logger";
import { getSession } from "@/lib/session";
import type { Task, Project } from "@/types";

/**
 * UPDATE TASK
 * - Updates task fields
 * - Tracks changes for audit logging
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const res = NextResponse.next();
    const session = await getSession(req, res);

    // Auth check
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;
    const body = await req.json();

    const db = await readDB();

    // Find task
    const index = db.tasks.findIndex((t: Task) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const existing = db.tasks[index];

    // Ownership check (IMPORTANT SECURITY FIX)
    const project = db.projects.find(
      (p: Project) => p.id === existing.projectId && p.userId === user.id
    );

    if (!project) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Remove undefined fields
    const cleanBody = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== undefined)
    );

    // Apply update
    const updated = {
      ...existing,
      ...cleanBody,
      updatedAt: new Date().toISOString(),
    };

    db.tasks[index] = updated;
    await writeDB(db);

    // Track changes for logging
    const changes: string[] = [];

    if (body.status && body.status !== existing.status) changes.push("status");
    if (body.dueDate && body.dueDate !== existing.dueDate) changes.push("dueDate");
    if (body.title && body.title !== existing.title) changes.push("title");
    if (body.description && body.description !== existing.description) changes.push("description");
    if (body.priority && body.priority !== existing.priority) changes.push("priority");

    if (
      body.tags &&
      JSON.stringify(body.tags) !== JSON.stringify(existing.tags)
    ) {
      changes.push("tags");
    }

    // Single field change logging
    if (changes.length === 1) {
      const field = changes[0];

      if (field === "status") {
        await addLog({
          userId: user.id,
          projectId: existing.projectId,
          taskId: id,
          entity: "task",
          action: "move",
          message: `Task "${existing.title}" moved to ${body.status}`,
          meta: { from: existing.status, to: body.status },
        });
      }

      if (field === "dueDate") {
        await addLog({
          userId: user.id,
          projectId: existing.projectId,
          taskId: id,
          entity: "task",
          action: "update",
          message: `Due date of "${existing.title}" changed`,
          meta: { from: existing.dueDate, to: body.dueDate },
        });
      }

      if (field === "title") {
        await addLog({
          userId: user.id,
          projectId: existing.projectId,
          taskId: id,
          entity: "task",
          action: "update",
          message: `Title changed from "${existing.title}" to "${body.title}"`,
        });
      }

      if (field === "description") {
        await addLog({
          userId: user.id,
          projectId: existing.projectId,
          taskId: id,
          entity: "task",
          action: "update",
          message: `Description of "${existing.title}" updated`,
        });
      }

      if (field === "priority") {
        await addLog({
          userId: user.id,
          projectId: existing.projectId,
          taskId: id,
          entity: "task",
          action: "update",
          message: `Priority of "${existing.title}" changed`,
          meta: { from: existing.priority, to: body.priority },
        });
      }

      if (field === "tags") {
        await addLog({
          userId: user.id,
          projectId: existing.projectId,
          taskId: id,
          entity: "task",
          action: "update",
          message: `Tags of "${existing.title}" updated`,
          meta: { from: existing.tags, to: body.tags },
        });
      }
    }

    // Multi-field update logging
    else if (changes.length > 1) {
      await addLog({
        userId: user.id,
        projectId: existing.projectId,
        taskId: id,
        entity: "task",
        action: "update",
        message: `Task "${existing.title}" updated`,
        meta: { fields: changes },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT task error:", error);

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

/**
 * DELETE TASK
 * - Removes task from DB
 * - Logs deletion
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const res = NextResponse.next();
    const session = await getSession(req, res);

    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;

    const db = await readDB();

    const index = db.tasks.findIndex((t: Task) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const task = db.tasks[index];

    // Ownership check
    const project = db.projects.find(
      (p: Project) => p.id === task.projectId && p.userId === user.id
    );

    if (!project) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    db.tasks.splice(index, 1);
    await writeDB(db);

    await addLog({
      userId: user.id,
      projectId: task.projectId,
      taskId: id,
      entity: "task",
      action: "delete",
      message: `Task "${task.title}" deleted`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE task error:", error);

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
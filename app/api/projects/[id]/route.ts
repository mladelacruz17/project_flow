import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { addLog } from "@/lib/logger";
import { getSession } from "@/lib/session";
import type { Project } from "@/types";

/**
 * Update a project (only owner can update)
 */
export async function PUT(
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

    const { name, description, deadline } = await req.json();

    const db = await readDB();

    const index = db.projects.findIndex(
      (p: Project) => p.id === id && p.userId === user.id
    );

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const oldProject = db.projects[index];

    const updated = {
      ...oldProject,
      name,
      description,
      deadline,
    };

    if (!name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    db.projects[index] = updated;
    await writeDB(db);

    await addLog({
      userId: user.id,
      projectId: id,
      entity: "project",
      action: "update",
      message: `Project "${name}" updated`,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT project error:", error);

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

/**
 * Delete a project (and related logs + tasks)
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

    // Ensure user owns the project
    const index = db.projects.findIndex(
      (p: Project) => p.id === id && p.userId === user.id
    );

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Remove project, related tasks & related logs
    db.projects.splice(index, 1);
    db.logs = db.logs.filter((log: any) => log.projectId !== id);
    db.tasks = db.tasks.filter((task: any) => task.projectId !== id);

    await writeDB(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE project error:", error);

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
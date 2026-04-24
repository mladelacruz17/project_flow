import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { addLog } from "@/lib/logger";
import { getSession } from "@/lib/session";
import type { Project  } from "@/types";

/**
 * Get current user's projects
 */
export async function GET(req: Request) {
  try {
    const res = NextResponse.next();

    const session = await getSession(req, res);

    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;

    const db = await readDB();

    const userProjects = db.projects.filter(
      (p: Project) => p.userId === user.id
    );

    return NextResponse.json(userProjects);
  } catch (error) {
    console.error("GET projects error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/**
 * Create a new project for the logged-in user
 */
export async function POST(req: Request) {
  try {
    const res = NextResponse.next();

    const session = await getSession(req, res);

    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;

    const { name, description, deadline } = await req.json();
    
    if (!name ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await readDB();

    const nextId =
      "p" +
      (db.projects.length > 0
        ? Math.max(...db.projects.map((p: Project) => Number(p.id.slice(1)))) + 1
        : 1);

    const newProject = {
      id: nextId,
      name,
      description,
      deadline,
      userId: user.id,
    };

    db.projects.push(newProject);
    await writeDB(db);

    // Log project creation activity
    await addLog({
      userId: user.id,
      projectId: nextId,
      entity: "project",
      action: "create",
      message: `Project "${name}" created`,
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("POST project error:", error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import type { Log } from "@/types";

/**
 * Fetch activity logs
 * - Optionally filters logs by projectId
 * - Used for project/task activity history UI
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    const db = await readDB();

    const logs: Log[] = db.logs || [];

    // Filter logs by project if projectId is provided
    const filteredLogs = projectId
      ? logs.filter((log) => log.projectId === projectId)
      : logs;

    return NextResponse.json(filteredLogs);
  } catch (error) {
    console.error("Logs fetch error:", error);

    // Return safe error response without exposing internal details
    return NextResponse.json(
      { message: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
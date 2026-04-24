import { seed } from "@/seed";
import { writeDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  await writeDB(seed);
  return NextResponse.json({ message: "Database reset" });
}
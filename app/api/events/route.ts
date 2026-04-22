import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { Event } from "@/lib/types";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection<Event>(collections.events)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    const serialized = list.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));
    return NextResponse.json(serialized);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const body = await request.json();
  const now = new Date().toISOString();
  const images = Array.isArray(body.images)
    ? body.images.filter((value: unknown): value is string => typeof value === "string" && value.trim().length > 0)
    : typeof body.image === "string" && body.image.trim().length > 0
      ? [body.image]
      : [];
  const doc: Omit<Event, "_id"> = {
    name: body.name ?? "",
    images,
    image: images[0] ?? "",
    description: body.description ?? "",
    order: Number(body.order) ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const db = await getDb();
    const { insertedId } = await db
      .collection<Event>(collections.events)
      .insertOne(doc as Event);
    return NextResponse.json({
      ...doc,
      _id: insertedId.toString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

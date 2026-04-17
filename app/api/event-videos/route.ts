import { NextResponse } from "next/server";
import { getDb, collections } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { EventVideo } from "@/lib/types";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection<EventVideo>(collections.eventVideos)
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
      { error: "Failed to fetch event videos" },
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
  const doc: Omit<EventVideo, "_id"> = {
    title: body.title ?? "",
    videoUrl: body.videoUrl ?? "",
    thumbnail: body.thumbnail ?? undefined,
    order: Number(body.order) ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const db = await getDb();
    const { insertedId } = await db
      .collection<EventVideo>(collections.eventVideos)
      .insertOne(doc as EventVideo);
    return NextResponse.json({
      ...doc,
      _id: insertedId.toString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create event video" },
      { status: 500 }
    );
  }
}

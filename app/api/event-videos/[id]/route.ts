import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb, collections } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { EventVideo } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const doc = await db
      .collection<EventVideo>(collections.eventVideos)
      .findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...doc,
      _id: doc._id.toString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch event video" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const now = new Date().toISOString();
  const update: Partial<EventVideo> = {
    updatedAt: now,
    ...(body.title !== undefined && { title: body.title }),
    ...(body.videoUrl !== undefined && { videoUrl: body.videoUrl }),
    ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail || undefined }),
    ...(body.order !== undefined && { order: Number(body.order) }),
  };

  try {
    const db = await getDb();
    const result = await db
      .collection<EventVideo>(collections.eventVideos)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: "after" }
      );
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...result,
      _id: result._id.toString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update event video" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db
      .collection<EventVideo>(collections.eventVideos)
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete event video" },
      { status: 500 }
    );
  }
}

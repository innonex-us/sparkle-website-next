import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { GalleryItem } from "@/lib/types";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection<GalleryItem>(collections.gallery)
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
      { error: "Failed to fetch gallery" },
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
  const doc: Omit<GalleryItem, "_id"> = {
    title: body.title ?? "",
    image: body.image ?? "",
    videoUrl: body.videoUrl ?? undefined,
    caption: body.caption ?? "",
    order: Number(body.order) ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const db = await getDb();
    const { insertedId } = await db
      .collection<GalleryItem>(collections.gallery)
      .insertOne(doc as GalleryItem);
    return NextResponse.json({
      ...doc,
      _id: insertedId.toString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

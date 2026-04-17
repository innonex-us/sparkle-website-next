import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { BlogPost } from "@/lib/types";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection<BlogPost>(collections.blog)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    const serialized = list.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));
    return NextResponse.json(serialized);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
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
  const doc: Omit<BlogPost, "_id"> = {
    title: body.title ?? "",
    slug: body.slug ?? body.title?.toLowerCase().replace(/\s+/g, "-") ?? "",
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    coverImage: body.coverImage ?? "",
    published: Boolean(body.published),
    createdAt: now,
    updatedAt: now,
  };

  try {
    const db = await getDb();
    const { insertedId } = await db
      .collection<BlogPost>(collections.blog)
      .insertOne(doc as BlogPost);
    return NextResponse.json({
      ...doc,
      _id: insertedId.toString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

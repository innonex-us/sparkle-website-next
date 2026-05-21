import { NextResponse } from "next/server";
import { getDb, collections } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { SiteProfile } from "@/lib/types";

const PROFILE_DOC_ID = "main";

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db
      .collection<SiteProfile>(collections.siteProfile)
      .findOne({ _id: PROFILE_DOC_ID as never });
    return NextResponse.json({ pdfUrl: doc?.pdfUrl ?? "" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch site profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const body = await request.json();
  const pdfUrl: string = body.pdfUrl ?? "";
  const now = new Date().toISOString();

  try {
    const db = await getDb();
    await db
      .collection(collections.siteProfile)
      .updateOne(
        { _id: PROFILE_DOC_ID as never },
        { $set: { pdfUrl, updatedAt: now } },
        { upsert: true }
      );
    return NextResponse.json({ pdfUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update site profile" }, { status: 500 });
  }
}

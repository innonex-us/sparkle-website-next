import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { EventVideo } from "@/lib/types";
import { ObjectId } from "mongodb";
import { EventVideoForm } from "@/components/admin/event-video-form";

export default async function EditEventVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const doc = await db
    .collection<EventVideo>(collections.eventVideos)
    .findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  const initial = {
    _id: doc._id!.toString(),
    title: doc.title,
    videoUrl: doc.videoUrl,
    thumbnail: doc.thumbnail ?? "",
    order: doc.order,
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/event-videos" className="hover:text-foreground">
          Events videos
        </Link>
        <span>/</span>
        <span>Edit</span>
      </div>
      <h1 className="text-2xl font-bold">Edit: {doc.title}</h1>
      <EventVideoForm initial={initial} />
    </div>
  );
}

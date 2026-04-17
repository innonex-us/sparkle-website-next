import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { Event } from "@/lib/types";
import { ObjectId } from "mongodb";
import { EventForm } from "@/components/admin/event-form";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const doc = await db
    .collection<Event>(collections.events)
    .findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  const initial = {
    _id: doc._id!.toString(),
    name: doc.name,
    image: doc.image,
    description: doc.description ?? "",
    order: doc.order,
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/events" className="hover:text-foreground">
          Events
        </Link>
        <span>/</span>
        <span>Edit</span>
      </div>
      <h1 className="text-2xl font-bold">Edit: {doc.name}</h1>
      <EventForm initial={initial} />
    </div>
  );
}

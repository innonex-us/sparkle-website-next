import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { Event } from "@/lib/types";
import { DeleteEventButton } from "./delete-button";

export default async function AdminEventsPage() {
  const db = await getDb();
  const list = await db
    .collection<Event>(collections.events)
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="size-4" />
            New event
          </Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No events yet. Create one to get started.</p>
        ) : (
          list.map((event) => (
            <Card key={event._id!.toString()} className="overflow-hidden">
              <div className="relative aspect-[3/4] w-full bg-muted">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover"
                  unoptimized={event.image.startsWith("https://res.cloudinary.com")}
                />
              </div>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardContent className="p-0">
                  <p className="font-medium">{event.name}</p>
                </CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon-sm" asChild>
                    <Link href={`/admin/events/${event._id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeleteEventButton id={event._id!.toString()} name={event.name} />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

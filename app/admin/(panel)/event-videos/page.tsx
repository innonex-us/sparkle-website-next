import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { EventVideo } from "@/lib/types";
import { DeleteEventVideoButton } from "./delete-button";

const DEFAULT_THUMB = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80";

export default async function AdminEventVideosPage() {
  const db = await getDb();
  const list = await db
    .collection<EventVideo>(collections.eventVideos)
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events videos (home page)</h1>
        <Button asChild>
          <Link href="/admin/event-videos/new">
            <Plus className="size-4" />
            New video
          </Link>
        </Button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        These videos appear in the &quot;Event videos&quot; section on the home page.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No event videos yet. Add one to show on the home page.</p>
        ) : (
          list.map((item) => (
            <Card key={item._id!.toString()} className="overflow-hidden">
              <div className="relative aspect-video w-full bg-muted">
                <Image
                  src={item.thumbnail || DEFAULT_THUMB}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized={(item.thumbnail ?? "").startsWith("https://res.cloudinary.com")}
                />
              </div>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardContent className="p-0">
                  <p className="font-medium">{item.title}</p>
                </CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon-sm" asChild>
                    <Link href={`/admin/event-videos/${item._id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeleteEventVideoButton id={item._id!.toString()} title={item.title} />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

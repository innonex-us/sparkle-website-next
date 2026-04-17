import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { GalleryItem } from "@/lib/types";
import { DeleteGalleryButton } from "./delete-button";

export default async function AdminGalleryPage() {
  const db = await getDb();
  const list = await db
    .collection<GalleryItem>(collections.gallery)
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <Plus className="size-4" />
            New item
          </Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No gallery items yet. Create one to get started.</p>
        ) : (
          list.map((item) => (
            <Card key={item._id!.toString()} className="overflow-hidden">
              <div className="relative aspect-video w-full bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized={item.image.startsWith("https://res.cloudinary.com")}
                />
              </div>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardContent className="p-0">
                  <p className="font-medium">{item.title}</p>
                  {item.caption && (
                    <p className="text-sm text-muted-foreground">{item.caption}</p>
                  )}
                </CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon-sm" asChild>
                    <Link href={`/admin/gallery/${item._id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeleteGalleryButton id={item._id!.toString()} title={item.title} />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

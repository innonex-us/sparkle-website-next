import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { GalleryItem } from "@/lib/types";
import { ObjectId } from "mongodb";
import { GalleryForm } from "@/components/admin/gallery-form";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const doc = await db
    .collection<GalleryItem>(collections.gallery)
    .findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  const initial = {
    _id: doc._id!.toString(),
    title: doc.title,
    image: doc.image,
    videoUrl: doc.videoUrl ?? "",
    caption: doc.caption ?? "",
    order: doc.order,
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/gallery" className="hover:text-foreground">
          Gallery
        </Link>
        <span>/</span>
        <span>Edit</span>
      </div>
      <h1 className="text-2xl font-bold">Edit: {doc.title}</h1>
      <GalleryForm initial={initial} />
    </div>
  );
}

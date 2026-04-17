import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { GalleryItem } from "@/lib/types";

export type GalleryDisplayItem = Omit<GalleryItem, "_id"> & { _id: string };

export async function getGalleryItems(): Promise<GalleryDisplayItem[]> {
  const db = await getDb();
  const list = await db
    .collection<GalleryItem>(collections.gallery)
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();
  return list.map((doc) => ({
    ...doc,
    _id: doc._id!.toString(),
  }));
}

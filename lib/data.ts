import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { Event } from "@/lib/types";
import type { GalleryItem as GalleryDoc } from "@/lib/types";
import type { EventVideo } from "@/lib/types";
import { events as staticEvents, programVideoThumbnails } from "@/lib/home-content";

export type EventItem = { name: string; image: string };
export type GalleryDisplayItem = { image: string; title?: string; caption?: string; videoUrl?: string; _id?: string };
export type EventVideoItem = { _id: string; title: string; videoUrl: string; thumbnail?: string; order: number };

export async function getEvents(): Promise<EventItem[]> {
  try {
    const db = await getDb();
    const list = await db
      .collection<Event>(collections.events)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    if (list.length === 0) return [...staticEvents];
    return list.map((e) => ({ name: e.name, image: e.image }));
  } catch {
    return [...staticEvents];
  }
}

export async function getGalleryForVideos(): Promise<GalleryDisplayItem[]> {
  try {
    const db = await getDb();
    const list = await db
      .collection<GalleryDoc>(collections.gallery)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    if (list.length === 0) {
      return programVideoThumbnails.map((src) => ({ image: src }));
    }
    return list.map((item) => ({ 
      image: item.image, 
      videoUrl: item.videoUrl, 
      title: item.title,
      _id: item._id?.toString()
    }));
  } catch {
    return programVideoThumbnails.map((src, idx) => ({ image: src, _id: `static-${idx}` }));
  }
}

export async function getEventVideos(): Promise<EventVideoItem[]> {
  try {
    const db = await getDb();
    const list = await db
      .collection<EventVideo>(collections.eventVideos)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    return list.map((doc) => ({
      _id: doc._id!.toString(),
      title: doc.title,
      videoUrl: doc.videoUrl,
      thumbnail: doc.thumbnail,
      order: doc.order,
    }));
  } catch {
    return [];
  }
}

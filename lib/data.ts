import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { Event } from "@/lib/types";
import type { GalleryItem as GalleryDoc } from "@/lib/types";
import type { EventVideo } from "@/lib/types";
import { events as staticEvents, programVideoThumbnails } from "@/lib/home-content";

export type EventItem = {
  _id?: string;
  name: string;
  /** Primary / first image for SEO and fallbacks */
  image: string;
  /** All gallery URLs for this event (deduped, non-empty) */
  images: string[];
};

function normalizeEventImageUrls(e: Event): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (u: string) => {
    const t = u.trim();
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push(t);
  };
  if (Array.isArray(e.images)) {
    for (const u of e.images) {
      if (typeof u === "string") push(u);
    }
  }
  if (typeof e.image === "string") push(e.image);
  return out;
}

function fallbackEventImage(index: number): string {
  return (
    staticEvents[index % staticEvents.length]?.image ?? staticEvents[0].image
  );
}
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
    if (list.length === 0) {
      return staticEvents.map((s, index) => ({
        name: s.name,
        image: s.image,
        images: [s.image],
        _id: `static-${index}`,
      }));
    }
    return list.map((e, index) => {
      const urls = normalizeEventImageUrls(e);
      const image = urls[0] ?? fallbackEventImage(index);
      const images = urls.length > 0 ? urls : [image];
      return {
        _id: e._id?.toString(),
        name: e.name,
        image,
        images,
      };
    });
  } catch {
    return staticEvents.map((s, index) => ({
      name: s.name,
      image: s.image,
      images: [s.image],
      _id: `static-${index}`,
    }));
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

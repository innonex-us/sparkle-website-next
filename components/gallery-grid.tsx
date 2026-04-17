"use client";

import Image from "next/image";
import type { GalleryDisplayItem } from "@/lib/gallery-data";

function getEmbedUrl(url: string): { type: "iframe"; url: string } | { type: "video"; url: string } | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.hostname === "youtu.be" ? u.pathname.slice(1) : u.searchParams.get("v");
      return id ? { type: "iframe", url: `https://www.youtube.com/embed/${id}` } : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id ? { type: "iframe", url: `https://player.vimeo.com/video/${id}` } : null;
    }
    if (url.match(/\.(mp4|webm|ogg)(\?|$)/i)) {
      return { type: "video", url };
    }
    return null;
  } catch {
    return null;
  }
}

export function GalleryGrid({ items }: { items: GalleryDisplayItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-12 text-center text-muted-foreground">
        No gallery items yet. Check back later.
      </p>
    );
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const embedUrl = item.videoUrl ? getEmbedUrl(item.videoUrl) : null;

        return (
          <article
            key={item._id}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <div className="relative aspect-video w-full bg-muted">
              {embedUrl?.type === "iframe" ? (
                <iframe
                  src={embedUrl.url}
                  title={item.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : embedUrl?.type === "video" ? (
                <video
                  src={embedUrl.url}
                  controls
                  className="absolute inset-0 h-full w-full object-contain"
                  poster={item.image || undefined}
                />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={item.image.startsWith("https://res.cloudinary.com")}
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{item.title}</h2>
              {item.caption && (
                <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

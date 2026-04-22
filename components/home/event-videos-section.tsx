"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Play } from "lucide-react";
import type { EventVideoItem } from "@/lib/data";

const DEFAULT_THUMB = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80";

export function EventVideosSection({ items }: { items: EventVideoItem[] }) {
  if (items.length === 0) return null;

  return (
    <section
      id="event-videos"
      className="relative border-b bg-background px-4 py-14 md:px-6 md:py-20 bg-grid-subtle"
      aria-labelledby="event-videos-heading"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Event videos
          </p>
          <h2
            id="event-videos-heading"
            className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          >
            Highlights from our events
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Watch moments from conferences, corporate programs, and events we have delivered.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <a
              key={item._id}
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-lg transition-shadow hover:shadow-xl"
            >
              <Image
                src={item.thumbnail || DEFAULT_THUMB}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={(item.thumbnail ?? "").startsWith("https://res.cloudinary.com")}
              />
              <div
                className="absolute inset-0 bg-foreground/30 transition-colors group-hover:bg-foreground/40"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 sm:p-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110 sm:size-16">
                  <Play className="size-6 fill-primary pl-1 sm:size-8" />
                </div>
                <p className="text-center text-sm font-medium text-white drop-shadow-md">
                  {item.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

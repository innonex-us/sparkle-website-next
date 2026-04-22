"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Play } from "lucide-react";

type VideoItem = { _id?: string; image: string; videoUrl?: string; title?: string };

function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
  };

  if (isPlaying && item.videoUrl) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black shadow-lg">
        <iframe
          src={getEmbedUrl(item.videoUrl)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-lg transition-shadow hover:shadow-xl ${item.videoUrl ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (item.videoUrl) setIsPlaying(true);
      }}
    >
      <Image
        src={item.image}
        alt={item.title || `Gallery ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        quality={72}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized={item.image.startsWith("https://res.cloudinary.com")}
      />
      <div
        className="absolute inset-0 bg-foreground/30 transition-colors group-hover:bg-foreground/40"
        aria-hidden
      />
      {item.videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110">
            <Play className="size-8 fill-primary pl-1" />
          </div>
        </div>
      )}
      <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-medium text-white drop-shadow-md">
        {item.title || `Gallery ${index + 1}`}
      </p>
    </div>
  );
}

export function ProgramVideosSection({ items }: { items: VideoItem[] }) {
  return (
    <section
      id="videos"
      className="relative border-b bg-muted/20 px-4 py-14 md:px-6 md:py-20 bg-grid-subtle"
      aria-labelledby="videos-heading"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            See our work
          </p>
          <h2
            id="videos-heading"
            className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          >
            Our Program Videos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Highlights from conferences, corporate programs, and events we have
            delivered.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <VideoCard key={item._id || `${item.image}-${index}`} item={item} index={index} />
          ))}
        </div>
        {items.length > 0 && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Managed from the admin gallery
          </p>
        )}
      </SectionReveal>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { StaggerReveal, StaggerItem } from "@/components/ui/section-reveal";
import { defaultTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/lib/data";

function isCloudinary(src: string) {
  return src.startsWith("https://res.cloudinary.com");
}

function eventSlides(event: EventItem): string[] {
  const list =
    event.images.length > 0 ? event.images : [event.image].filter(Boolean);
  return list;
}

function EventGalleryLightbox({
  event,
  initialIndex,
  open,
  onClose,
}: {
  event: EventItem | null;
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const slides = event ? eventSlides(event) : [];
  const [idx, setIdx] = useState(0);

  const go = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIdx(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (!open || !event || slides.length === 0) return;
    const safe = Math.min(
      Math.max(0, initialIndex),
      Math.max(0, slides.length - 1)
    );
    setIdx(safe);
  }, [open, event, initialIndex, slides.length]);

  useEffect(() => {
    if (!open || slides.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        setIdx((i) => ((i - 1 + slides.length) % slides.length));
        return;
      }
      if (e.key === "ArrowRight") {
        setIdx((i) => ((i + 1) % slides.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, slides.length]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !event || slides.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="relative z-10 flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <h2
          id={titleId}
          className="min-w-0 flex-1 text-balance pr-2 text-base font-semibold text-white sm:text-lg"
        >
          {event.name}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          aria-label="Close"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 sm:px-8">
          {slides.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(idx - 1);
              }}
              className="absolute left-1 z-20 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-white/10 sm:left-4 md:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-6 sm:size-7" />
            </button>
          )}
          <div
            className="relative aspect-3/4 w-full max-w-[min(100%,560px)] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {slides.map((src, i) => (
              <Image
                key={`${src}-lb-${i}`}
                src={src}
                alt={i === idx ? `${event.name} — photo ${i + 1}` : ""}
                fill
                aria-hidden={i !== idx}
                className={cn(
                  "absolute inset-0 rounded-lg object-contain transition-opacity duration-300",
                  i === idx ? "z-1 opacity-100" : "z-0 opacity-0 pointer-events-none"
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1200px"
                quality={85}
                priority
                unoptimized={isCloudinary(src)}
              />
            ))}
          </div>
          {slides.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(idx + 1);
              }}
              className="absolute right-1 z-20 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-white/10 sm:right-4 md:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="size-6 sm:size-7" />
            </button>
          )}
        </div>

        {slides.length > 1 && (
          <div className="shrink-0 border-t border-white/10 bg-black/40 px-3 py-3 sm:px-4">
            <p className="mb-2 text-center text-xs text-white/60">
              {idx + 1} / {slides.length}
            </p>
            <div className="flex max-w-full justify-center gap-2 overflow-x-auto pb-1">
              {slides.map((src, i) => (
                <button
                  key={`thumb-${src}-${i}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(i);
                  }}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all sm:h-16 sm:w-24",
                    i === idx
                      ? "border-white ring-2 ring-white/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  aria-label={`View photo ${i + 1}`}
                  aria-current={i === idx}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized={isCloudinary(src)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({
  event,
  onOpenGallery,
}: {
  event: EventItem;
  onOpenGallery: (event: EventItem, startIndex: number) => void;
}) {
  const slides = eventSlides(event);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [slides.length]);

  const openGallery = () => onOpenGallery(event, index);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openGallery}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openGallery();
        }
      }}
      className={cn(
        "cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <Card className="group overflow-hidden border-primary/10 p-0 gap-0 py-0 shadow-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-xl">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
          {slides.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt={i === index ? event.name : ""}
              fill
              aria-hidden={i !== index}
              className={cn(
                "object-cover transition-all duration-500 ease-out",
                i === index
                  ? "z-1 opacity-100 group-hover:scale-110"
                  : "z-0 opacity-0 pointer-events-none"
              )}
              quality={72}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 34vw, 420px"
              unoptimized={isCloudinary(src)}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/85 via-foreground/25 to-transparent" />
          <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/90 sm:text-xs">
            View
          </div>
          {slides.length > 1 && (
            <div
              className="absolute bottom-14 left-0 right-0 z-10 flex justify-center gap-1.5 px-3"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show photo ${i + 1} of ${slides.length}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 min-w-[6px] rounded-full transition-all duration-300",
                    i === index
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/45 hover:bg-white/70"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    go(i);
                  }}
                />
              ))}
            </div>
          )}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-1 p-3 sm:p-4">
            <CardTitle className="text-balance text-sm font-semibold leading-snug text-white drop-shadow-md sm:text-base md:text-lg">
              {event.name}
            </CardTitle>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function EventsSection({ events }: { events: EventItem[] }) {
  const [lightbox, setLightbox] = useState<{
    event: EventItem;
    index: number;
  } | null>(null);

  return (
    <section
      id="events"
      className="relative border-b bg-background px-4 py-16 md:px-6 md:py-24 bg-grid-subtle"
      aria-labelledby="events-heading"
    >
      <EventGalleryLightbox
        event={lightbox?.event ?? null}
        initialIndex={lightbox?.index ?? 0}
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
      />
      <StaggerReveal className="container mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Event types
          </p>
          <h2
            id="events-heading"
            className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          >
            Events we deliver
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-3 xl:gap-8 2xl:grid-cols-4">
          {events.map((event, index) => (
            <StaggerItem key={event._id ?? `${event.name}-${index}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={defaultTransition}
              >
                <EventCard
                  event={event}
                  onOpenGallery={(e, start) => setLightbox({ event: e, index: start })}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>
    </section>
  );
}

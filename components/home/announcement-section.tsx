"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { announcementImage } from "@/lib/home-content";

export function AnnouncementSection() {
  return (
    <section
      id="announcement"
      className="relative border-b bg-primary/5 px-4 py-16 md:px-6 md:py-24 bg-glow-bottom"
      aria-labelledby="announcement-heading"
    >
      <SectionReveal className="container relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted shadow-lg lg:aspect-auto lg:min-h-[280px]">
            <Image
              src={announcementImage}
              alt="Campaign and creative work"
              fill
              className="object-cover"
              quality={75}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-center text-sm font-medium uppercase tracking-wider text-primary lg:text-left">
              Announcement
            </p>
            <h2
              id="announcement-heading"
              className="mt-2 text-center text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-left"
            >
              Our priority while crafting campaigns for you
            </h2>
            <p className="mt-8 text-center text-muted-foreground leading-relaxed lg:text-left">
              Our priority always lies in crafting interactive ideas for your
              brands that you require the most. We don&apos;t like to talk about
              ourselves much—we let our work do it. Through our expertise,
              in-depth knowledge, and integrity we commit to delivering an
              exceptional experience to customers each and every time they use our
              service.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

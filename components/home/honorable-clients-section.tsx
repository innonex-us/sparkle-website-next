"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { clientsSectionImage } from "@/lib/home-content";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clientLogos = [
  "/contributor/3-1.png",
  "/contributor/4-1.png",
  "/contributor/5-1.png",
  "/contributor/6-1.png",
  "/contributor/7-1.png",
  "/contributor/8-1.png",
  "/contributor/9-1.png",
  "/contributor/10-1.png",
  "/contributor/11-1.png",
];

export function HonorableClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback manual scroll logic in case someone clicks arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200; // adjust as needed
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="clients"
      className="relative border-b bg-background px-4 py-16 md:px-6 md:py-20 bg-mesh"
      aria-labelledby="clients-heading"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Trusted by
          </p>
          <h2
            id="clients-heading"
            className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Honorable Clients & Contributors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We are proud to have served government bodies, local companies, and
            organizations across Bangladesh.
          </p>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-muted shadow-lg">
          <div className="relative aspect-[21/9] w-full min-h-[200px]">
            <Image
              src={clientsSectionImage}
              alt="Our clients and events"
              fill
              className="object-cover"
              quality={75}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-foreground/40" aria-hidden />
          </div>
        </div>
        <div 
          className="mt-16 relative flex w-full items-center group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-primary/20 bg-background/80 shadow-sm backdrop-blur transition-all hover:scale-110 hover:border-primary/50 hover:bg-muted group-hover:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>

          <div 
            ref={scrollRef}
            className="flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] scroll-smooth"
          >
            <div 
              className={`flex w-max min-w-full items-center gap-6 pr-6 transition-all duration-300 ${isHovered ? 'animate-none' : 'animate-marquee'}`}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logoPath, index) => (
                <div
                  key={index}
                  className="relative flex h-20 w-32 shrink-0 items-center justify-center rounded-xl border-2 border-primary/10 bg-muted/50 p-4 shadow-sm backdrop-blur sm:h-24 sm:w-40 transition-all hover:scale-105 hover:bg-primary/5 hover:border-primary/30"
                >
                  <Image
                    src={logoPath}
                    alt={`Client logo ${index + 1}`}
                    fill
                    className="object-contain p-3 grayscale transition-all duration-300 hover:grayscale-0"
                    sizes="(max-width: 640px) 128px, 160px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-primary/20 bg-background/80 shadow-sm backdrop-blur transition-all hover:scale-110 hover:border-primary/50 hover:bg-muted group-hover:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        </div>
      </SectionReveal>
    </section>
  );
}

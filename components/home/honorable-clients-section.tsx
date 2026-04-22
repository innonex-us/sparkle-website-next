"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const logoItems = [...clientLogos, ...clientLogos, ...clientLogos];

  const getFallbackLabel = (logoPath: string) => {
    const name = logoPath.split("/").pop()?.replace(".png", "") ?? "Client";
    return name.toUpperCase();
  };

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
      className="relative border-b bg-background px-4 py-14 md:px-6 md:py-20 bg-mesh"
      aria-labelledby="clients-heading"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Trusted by
          </p>
          <h2
            id="clients-heading"
            className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          >
            Honorable Clients & Contributors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We are proud to have served government bodies, local companies, and
            organizations across Bangladesh.
          </p>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-muted shadow-lg">
          <div className="relative aspect-21/9 w-full min-h-[200px]">
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
          className="relative mt-12 flex w-full items-center group md:mt-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-background/85 shadow-sm backdrop-blur transition-all hover:scale-110 hover:border-primary/50 hover:bg-muted md:left-0 md:h-10 md:w-10 md:-translate-x-1/2 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>

          <div 
            ref={scrollRef}
            className="flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_20px,black_calc(100%-20px),transparent_100%)] md:mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)] scroll-smooth"
          >
            <div 
              className={`flex w-max min-w-full items-center gap-6 pr-6 transition-all duration-300 ${isHovered ? 'animate-none' : 'animate-marquee'}`}
            >
              {logoItems.map((logoPath, index) => (
                <div
                  key={index}
                  className="relative flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border-2 border-primary/10 bg-background p-3 shadow-sm backdrop-blur sm:h-20 sm:w-32 md:h-24 md:w-40 transition-all hover:scale-105 hover:bg-primary/5 hover:border-primary/30"
                >
                  {!failedLogos[logoPath] ? (
                    <Image
                      src={logoPath}
                      alt={`Client logo ${index + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 160px"
                      onError={() =>
                        setFailedLogos((prev) => ({
                          ...prev,
                          [logoPath]: true,
                        }))
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-2 text-center text-[11px] font-semibold text-white sm:text-xs">
                      {getFallbackLabel(logoPath)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-background/85 shadow-sm backdrop-blur transition-all hover:scale-110 hover:border-primary/50 hover:bg-muted md:right-0 md:h-10 md:w-10 md:translate-x-1/2 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        </div>
      </SectionReveal>
    </section>
  );
}

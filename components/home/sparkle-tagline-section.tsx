"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { sparkleTaglineImage } from "@/lib/home-content";

export function SparkleTaglineSection() {
  return (
    <section
      className="relative overflow-hidden border-b bg-primary/5 bg-mesh px-4 py-10 md:px-6 md:py-12"
      aria-label="Sparkle"
    >
      <div className="absolute inset-0">
        <Image
          src={sparkleTaglineImage}
          alt=""
          fill
          className="object-cover opacity-25"
          quality={70}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" aria-hidden />
      </div>
      <SectionReveal className="container relative mx-auto max-w-4xl text-center">
        <p className="text-lg font-semibold tracking-wide text-primary">
          #Sparkle
        </p>
        <p className="mt-1 text-muted-foreground">
          Event Management Expert · Powered by passion and precision
        </p>
      </SectionReveal>
    </section>
  );
}

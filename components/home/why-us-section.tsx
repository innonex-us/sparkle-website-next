"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import { whyUsImage, meetWithUs } from "@/lib/home-content";
import { slideInLeft, slideInRight, defaultTransition } from "@/lib/motion";

export function WhyUsSection() {
  return (
    <section
      id="about"
      aria-labelledby="why-us-heading"
      className="relative border-b bg-muted/30 px-4 py-20 md:px-6 md:py-24 bg-mesh"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-lg lg:aspect-auto lg:min-h-[400px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
            transition={defaultTransition}
          >
            <Image
              src={whyUsImage}
              alt="Professional event planning"
              fill
              className="object-cover"
              quality={75}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideInRight}
            transition={defaultTransition}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              About us · Event Management Expert
            </p>
            <h2
              id="why-us-heading"
              className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
            >
              Why Us?
            </h2>
            <h3 className="mt-6 text-xl font-semibold text-primary">
              Do you dream of a program that dazzles?
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Planning an unforgettable experience takes expertise, creativity,
              and meticulous attention to detail. We&apos;re the team that
              brings your vision to life. From grand conferences to intimate
              gatherings, we handle every aspect of your event, ensuring a
              seamless and stress-free experience. Our team of passionate
              planners is dedicated to exceeding your expectations, leaving a
              lasting impression on you and your guests.
            </p>
            <div className="mt-8 rounded-lg border border-primary/20 bg-background/50 p-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {meetWithUs.heading}
              </p>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                {meetWithUs.address}
              </p>
            </div>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}

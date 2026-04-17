"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { StaggerReveal, StaggerItem } from "@/components/ui/section-reveal";
import { defaultTransition } from "@/lib/motion";
import type { EventItem } from "@/lib/data";

export function EventsSection({ events }: { events: EventItem[] }) {
  return (
    <section
      id="events"
      className="relative border-b bg-background px-4 py-20 md:px-6 md:py-24 bg-grid-subtle"
      aria-labelledby="events-heading"
    >
      <StaggerReveal className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Event types
          </p>
          <h2
            id="events-heading"
            className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Events we deliver
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {events.map((event, index) => (
            <StaggerItem key={`${event.name}-${index}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={defaultTransition}
              >
                <Card className="group overflow-hidden border-primary/10 shadow-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      quality={72}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <CardTitle className="text-lg text-white drop-shadow-md">
                        {event.name}
                      </CardTitle>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>
    </section>
  );
}

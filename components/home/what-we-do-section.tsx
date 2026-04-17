"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaggerReveal, StaggerItem } from "@/components/ui/section-reveal";
import { whatWeDo } from "@/lib/home-content";
import { defaultTransition } from "@/lib/motion";

export function WhatWeDoSection() {
  return (
    <section
      id="services"
      className="relative border-b bg-muted/20 px-4 py-20 md:px-6 md:py-24 bg-grid-subtle"
      aria-labelledby="what-we-do-heading"
    >
      <StaggerReveal className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Services
          </p>
          <h2
            id="what-we-do-heading"
            className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            What we can do for you
          </h2>
          <p className="mt-4 text-muted-foreground">
            End-to-end event and communication solutions tailored to your needs.
          </p>
        </div>
        <div className="mt-14 grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((item) => (
            <StaggerItem key={item.title} className="w-full">
              <Link href={item.href} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={defaultTransition}
                >
                  <Card className="h-full overflow-hidden border-primary/10 shadow-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-lg">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        quality={72}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-primary group-hover:underline">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-foreground/80">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>
    </section>
  );
}

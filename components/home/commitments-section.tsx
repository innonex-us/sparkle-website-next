"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaggerReveal, StaggerItem } from "@/components/ui/section-reveal";
import { commitments, commitmentsImage } from "@/lib/home-content";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { defaultTransition } from "@/lib/motion";

export function CommitmentsSection() {
  return (
    <section
      id="commitments"
      className="relative border-b bg-muted/20 px-4 py-20 md:px-6 md:py-24 bg-mesh"
      aria-labelledby="commitments-heading"
    >
      <StaggerReveal className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Our promise
          </p>
          <h2
            id="commitments-heading"
            className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Our commitments
          </h2>
          <p className="mt-4 text-muted-foreground">
            What you can expect when you work with us.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-muted shadow-md">
          <div className="relative h-48 w-full md:h-56">
            <Image
              src={commitmentsImage}
              alt="Our team at work"
              fill
              className="object-cover object-center"
              quality={75}
              sizes="(min-width: 1152px) 1152px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={defaultTransition}
                className="h-full"
              >
                <Card className="h-full border-primary/15 bg-card/80 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="size-5" />
                      </div>
                      <CardTitle className="text-base font-semibold leading-tight text-foreground">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-foreground/80 leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>
    </section>
  );
}

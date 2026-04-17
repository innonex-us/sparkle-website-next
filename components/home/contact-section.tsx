"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import { contact, contactImage } from "@/lib/home-content";
import { scaleIn, defaultTransition } from "@/lib/motion";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-muted/30 px-4 py-20 md:px-6 md:py-24 bg-grid-subtle"
      aria-labelledby="contact-heading"
    >
      <SectionReveal className="container relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            transition={defaultTransition}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-lg lg:aspect-auto lg:min-h-[320px]">
              <Image
                src={contactImage}
                alt="Team collaboration"
                fill
                className="object-cover"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <div className="order-1 text-center lg:order-2">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
            >
              We&apos;d love to hear from you
            </h2>
            <p className="mt-4 text-muted-foreground">
              Reach us at our office or send a message. Full contact details,
              phone numbers & map are in the footer below.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>{contact.address}</p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg">
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
              </motion.div>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${contact.phone1.replace(/\s/g, "")}`}>
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/home-content";
import { fadeInUp, defaultTransition, slowTransition } from "@/lib/motion";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] overflow-hidden border-b"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={heroImage}
          alt="Event audience and stage"
          fill
          className="object-cover"
          priority
          quality={82}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-foreground/60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        aria-hidden
      />
      <motion.div
        className="container relative mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center md:px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="max-w-4xl text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl"
          variants={fadeInUp}
          transition={slowTransition}
        >
          We Think Out of the Boundaries
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl"
          variants={fadeInUp}
          transition={defaultTransition}
        >
          Event management that brings your vision to life—for government,
          corporate, and community.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={fadeInUp}
          transition={defaultTransition}
        >
          <MagneticWrapper>
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/#about">Learn More</Link>
            </Button>
          </MagneticWrapper>
          <MagneticWrapper>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </MagneticWrapper>
        </motion.div>
      </motion.div>
    </section>
  );
}

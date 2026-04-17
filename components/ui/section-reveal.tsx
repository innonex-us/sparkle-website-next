"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  defaultTransition,
} from "@/lib/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
};

export function SectionReveal({
  children,
  className,
  once = true,
  amount = 0.15,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={reduceMotion ? "visible" : "hidden"}
        animate={reduceMotion || inView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={defaultTransition}
      >
        {children}
      </motion.div>
    </div>
  );
}

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
};

export function StaggerReveal({
  children,
  className,
  once = true,
  amount = 0.08,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={reduceMotion ? "visible" : "hidden"}
        animate={reduceMotion || inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} transition={defaultTransition} className={className}>
      {children}
    </motion.div>
  );
}

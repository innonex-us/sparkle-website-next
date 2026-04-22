"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  ChevronDown,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About us" },
  { href: "/#services", label: "Services" },
  { href: "/#clients", label: "Our Profile" },
  { href: "/#contact", label: "Contact us" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Sparkle Marketing Communication"
            width={160}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.slice(0, 2).map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
            >
              {label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              >
                Previous Events & Gallery
                <ChevronDown className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/#events">Previous Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gallery">Gallery</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#videos">Program videos</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks.slice(2).map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
            >
              {label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href="/#contact">Call Now</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-foreground rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Previous Events & Gallery
                </p>
                <Link
                  href="/#events"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-primary/10 hover:text-primary"
                >
                  Previous Events
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-primary/10 hover:text-primary"
                >
                  Gallery
                </Link>
                <Link
                  href="/#videos"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-primary/10 hover:text-primary"
                >
                  Program videos
                </Link>
              </div>
              <Button asChild className="mt-2" onClick={() => setOpen(false)}>
                <Link href="/#contact">Call Now</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

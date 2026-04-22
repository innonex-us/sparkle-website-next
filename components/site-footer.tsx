import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { contact, developerCredit } from "@/lib/home-content";

const MAP_QUERY = encodeURIComponent(
  "237 West Monipur, Mirpur-2, Dhaka 1216, Bangladesh"
);
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#about", label: "About us" },
  { href: "/#services", label: "Services" },
  { href: "/#events", label: "Events" },
  { href: "/#contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Main footer content - 3 columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Sparkle Marketing Communication"
                width={160}
                height={48}
                className="h-10 w-auto opacity-95"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Event management & marketing communication for government,
              corporate, and community.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Reach us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone1.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  {contact.phone1}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone2.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  {contact.phone2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 text-primary" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessageCircle className="size-4 shrink-0 text-primary" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Map - full width */}
        <div className="pb-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Location
          </h3>
          <div className="overflow-hidden rounded-xl border border-border shadow-md">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sparkle office location on Google Maps"
              className="block min-h-[280px] w-full md:min-h-[320px]"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2025 Sparkle Marketing Communication. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Developed by {developerCredit}
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/#contact"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/#about"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Terms
            </Link>
            <div className="flex items-center gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

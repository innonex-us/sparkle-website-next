"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { PremiumFeatures } from "@/components/premium-features";
import { ExperienceAssistant } from "@/components/experience-assistant";

/**
 * Public-site UI (header, theme assistant, cursor/progress) that must not
 * stack above the admin panel — fixed layers were overlapping the sidebar.
 */
export function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <>
      <PremiumFeatures />
      <ExperienceAssistant />
      <SiteHeader />
    </>
  );
}

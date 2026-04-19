import { SiteHeader } from "@/components/site-header";
import { PremiumFeatures } from "@/components/premium-features";
import { ExperienceAssistant } from "@/components/experience-assistant";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PremiumFeatures />
      <ExperienceAssistant />
      <SiteHeader />
      {children}
    </>
  );
}

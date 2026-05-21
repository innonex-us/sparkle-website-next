import {
  HeroSection,
  SparkleTaglineSection,
  WhatWeDoSection,
  WhyUsSection,
  EventsSection,
  EventVideosSection,
  CommitmentsSection,
  AnnouncementSection,
  HonorableClientsSection,
  ProgramVideosSection,
  ContactSection,
} from "@/components/home";
import { SiteFooter } from "@/components/site-footer";
import { getEvents, getGalleryForVideos, getEventVideos } from "@/lib/data";
import { getDb, collections } from "@/lib/db";
import type { SiteProfile } from "@/lib/types";

export const revalidate = 60;

export default async function Home() {
  const db = await getDb();
  const [events, galleryItems, eventVideos, siteProfileDoc] = await Promise.all([
    getEvents(),
    getGalleryForVideos(),
    getEventVideos(),
    db.collection<SiteProfile>(collections.siteProfile).findOne({ _id: "main" as never }),
  ]);
  const profilePdfUrl = siteProfileDoc?.pdfUrl ?? "";

  return (
    <>
      <main>
        <HeroSection />
        <SparkleTaglineSection />
        <WhatWeDoSection />
        <WhyUsSection />
        <EventsSection events={events} />
        <EventVideosSection items={eventVideos} />
        <CommitmentsSection />
        <AnnouncementSection />
        <HonorableClientsSection profilePdfUrl={profilePdfUrl} />
        <ProgramVideosSection items={galleryItems} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

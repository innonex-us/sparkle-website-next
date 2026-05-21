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
import { getEvents, getEventVideos } from "@/lib/data";
import { getDb, collections } from "@/lib/db";
import type { SiteProfile } from "@/lib/types";

export const revalidate = 60;

export default async function Home() {
  const db = await getDb();
  const [events, eventVideos, siteProfileDoc] = await Promise.all([
    getEvents(),
    getEventVideos(),
    db.collection<SiteProfile>(collections.siteProfile).findOne({ _id: "main" as never }),
  ]);
  const profilePdfUrl = siteProfileDoc?.pdfUrl ?? "";
  const FALLBACK_THUMB = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=640&q=78";
  const programVideoItems = eventVideos.map((v) => ({
    _id: v._id,
    image: v.thumbnail || FALLBACK_THUMB,
    videoUrl: v.videoUrl,
    title: v.title,
  }));

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
        <ProgramVideosSection items={programVideoItems} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

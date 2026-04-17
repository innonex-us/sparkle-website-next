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

export const revalidate = 60;

export default async function Home() {
  const [events, galleryItems, eventVideos] = await Promise.all([
    getEvents(),
    getGalleryForVideos(),
    getEventVideos(),
  ]);

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
        <HonorableClientsSection />
        <ProgramVideosSection items={galleryItems} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

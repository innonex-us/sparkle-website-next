import { getGalleryItems } from "@/lib/gallery-data";
import { SiteFooter } from "@/components/site-footer";
import { GalleryGrid } from "@/components/gallery-grid";

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <main className="min-h-screen px-4 py-16 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="mt-2 text-muted-foreground">
            Images and videos from our events and programs.
          </p>
          <GalleryGrid items={items} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

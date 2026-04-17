import Link from "next/link";
import { GalleryForm } from "@/components/admin/gallery-form";

export default function NewGalleryPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/gallery" className="hover:text-foreground">
          Gallery
        </Link>
        <span>/</span>
        <span>New item</span>
      </div>
      <h1 className="text-2xl font-bold">New gallery item</h1>
      <GalleryForm />
    </div>
  );
}

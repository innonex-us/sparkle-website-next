import Link from "next/link";
import { EventVideoForm } from "@/components/admin/event-video-form";

export default function NewEventVideoPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/event-videos" className="hover:text-foreground">
          Events videos
        </Link>
        <span>/</span>
        <span>New video</span>
      </div>
      <h1 className="text-2xl font-bold">New event video</h1>
      <EventVideoForm />
    </div>
  );
}

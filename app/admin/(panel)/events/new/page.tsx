import Link from "next/link";
import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/events" className="hover:text-foreground">
          Events
        </Link>
        <span>/</span>
        <span>New event</span>
      </div>
      <h1 className="text-2xl font-bold">New event</h1>
      <EventForm />
    </div>
  );
}

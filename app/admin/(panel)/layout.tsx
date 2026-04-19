import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Image,
  Calendar,
  Video,
  Settings,
} from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-svh bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-border bg-background">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <Link href="/admin" className="font-semibold text-primary">
            Sparkle Admin
          </Link>
        </div>
        <nav className="flex min-h-0 flex-1 flex-col p-2">
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain">
            <Link href="/admin">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
              >
                <FileText className="size-4" />
                Blog
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
              >
                <Calendar className="size-4" />
                Events
              </Button>
            </Link>
            <Link href="/admin/event-videos">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
              >
                <Video className="size-4" />
                Events videos
              </Button>
            </Link>
            <Link href="/admin/gallery">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
              >
                <Image className="size-4" />
                Gallery
              </Button>
            </Link>
          </div>
          <div className="shrink-0 space-y-1 border-t pt-2">
            <Link href="/admin/settings">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground"
                size="sm"
              >
                <Settings className="size-4" />
                Settings
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </aside>
      <main className="min-h-svh pl-56">
        <div className="container max-w-6xl px-4 py-8 sm:px-6">{children}</div>
      </main>
    </div>
  );
}

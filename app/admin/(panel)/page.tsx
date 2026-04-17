import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Calendar, Video, ArrowRight } from "lucide-react";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";

export default async function AdminDashboardPage() {
  const db = await getDb();
  const [blogCount, eventsCount, galleryCount, eventVideosCount] = await Promise.all([
    db.collection(collections.blog).countDocuments(),
    db.collection(collections.events).countDocuments(),
    db.collection(collections.gallery).countDocuments(),
    db.collection(collections.eventVideos).countDocuments(),
  ]);

  const links = [
    { href: "/admin/blog", label: "Blog posts", count: blogCount, icon: FileText },
    { href: "/admin/events", label: "Events", count: eventsCount, icon: Calendar },
    { href: "/admin/event-videos", label: "Event videos (home)", count: eventVideosCount, icon: Video },
    { href: "/admin/gallery", label: "Gallery items", count: galleryCount, icon: Image },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Overview of your content and quick access to the most important admin tools.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/settings">
            Settings
            <ArrowRight className="ml-1 size-3" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ href, label, count, icon: Icon }) => (
          <Card key={href}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">{label}</CardTitle>
              <Icon className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{count}</p>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <Link href={href}>
                  Manage <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button size="sm" asChild>
              <Link href="/admin/blog/new">
                New blog post
                <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/events/new">
                New event
                <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/event-videos/new">
                New event video
                <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/gallery/new">
                New gallery item
                <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Blog posts</span>
              <span className="font-medium text-foreground">{blogCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Events</span>
              <span className="font-medium text-foreground">{eventsCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Event videos (home)</span>
              <span className="font-medium text-foreground">{eventVideosCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Gallery items</span>
              <span className="font-medium text-foreground">{galleryCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

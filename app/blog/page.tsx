import Link from "next/link";
import Image from "next/image";
import { getDb, collections } from "@/lib/db";
import type { BlogPost } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = 60;

export default async function BlogPage() {
  const db = await getDb();
  const posts = await db
    .collection<BlogPost>(collections.blog)
    .find({ published: true })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <>
      <main className="min-h-screen px-4 py-16 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            News and updates from Sparkle Marketing Communication.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {posts.length === 0 ? (
              <p className="text-muted-foreground">No posts yet. Check back later.</p>
            ) : (
              posts.map((post) => (
                <Link key={post._id!.toString()} href={`/blog/${encodeURIComponent(post.slug)}`}>
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative aspect-video w-full bg-muted">
                      <Image
                        src={post.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized={post.coverImage?.startsWith("https://res.cloudinary.com")}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h2 className="font-semibold">{post.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

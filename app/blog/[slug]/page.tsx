import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb, collections } from "@/lib/db";
import type { BlogPost } from "@/lib/types";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = 60;

function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const trimmed = rawSlug?.trim() ?? "";
  const normalizedSlug = normalizeSlug(trimmed);
  const db = await getDb();
  const coll = db.collection<BlogPost>(collections.blog);

  let post: BlogPost | null = null;

  if (ObjectId.isValid(trimmed) && trimmed.length === 24) {
    post = await coll.findOne({ _id: new ObjectId(trimmed), published: true });
  }
  if (!post) {
    post = await coll.findOne({
      published: true,
      $or: [
        { slug: trimmed },
        { slug: normalizedSlug },
        { slug: rawSlug },
      ],
    });
  }
  if (!post) notFound();

  return (
    <>
      <main className="min-h-screen px-4 py-16 md:px-6">
        <article className="container mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Blog
          </Link>
          {post.coverImage && (
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={post.coverImage}
                alt=""
                fill
                className="object-cover"
                priority
                unoptimized={post.coverImage.startsWith("https://res.cloudinary.com")}
              />
            </div>
          )}
          <h1 className="mt-8 text-3xl font-bold">{post.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div
            className="prose prose-neutral mt-8 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

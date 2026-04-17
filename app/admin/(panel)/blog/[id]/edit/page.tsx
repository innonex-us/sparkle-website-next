import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { BlogPost } from "@/lib/types";
import { ObjectId } from "mongodb";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const doc = await db
    .collection<BlogPost>(collections.blog)
    .findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  const initial = {
    _id: doc._id!.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: doc.coverImage,
    published: doc.published,
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/blog" className="hover:text-foreground">
          Blog
        </Link>
        <span>/</span>
        <span>Edit</span>
      </div>
      <h1 className="text-2xl font-bold">Edit: {doc.title}</h1>
      <BlogForm initial={initial} />
    </div>
  );
}

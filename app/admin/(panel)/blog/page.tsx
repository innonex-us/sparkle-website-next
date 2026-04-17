import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { BlogPost } from "@/lib/types";
import { DeleteBlogButton } from "./delete-button";

export default async function AdminBlogPage() {
  const db = await getDb();
  const list = await db
    .collection<BlogPost>(collections.blog)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="size-4" />
            New post
          </Link>
        </Button>
      </div>
      <div className="mt-6 space-y-3">
        {list.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Create one to get started.</p>
        ) : (
          list.map((post) => (
            <Card key={post._id!.toString()}>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardContent className="flex-1 p-0">
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.published ? "Published" : "Draft"} · {post.slug}
                  </p>
                </CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon-sm" asChild>
                    <Link href={`/admin/blog/${post._id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeleteBlogButton id={post._id!.toString()} title={post.title} />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

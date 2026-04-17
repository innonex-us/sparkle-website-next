import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/blog" className="hover:text-foreground">
          Blog
        </Link>
        <span>/</span>
        <span>New post</span>
      </div>
      <h1 className="text-2xl font-bold">New blog post</h1>
      <BlogForm />
    </div>
  );
}

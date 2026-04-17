"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./image-upload";

type EventVideoFormProps = {
  initial?: {
    _id: string;
    title: string;
    videoUrl: string;
    thumbnail?: string;
    order: number;
  };
};

export function EventVideoForm({ initial }: EventVideoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? "");
  const [order, setOrder] = useState(initial?.order ?? 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = initial ? `/api/event-videos/${initial._id}` : "/api/event-videos";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, videoUrl, thumbnail: thumbnail || undefined, order }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      router.push("/admin/event-videos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoUrl">Video URL (YouTube, Vimeo, or direct link)</Label>
        <Input
          id="videoUrl"
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Thumbnail (optional, for card on home page)</Label>
        <ImageUpload value={thumbnail} onChange={setThumbnail} folder="event-videos" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order">Order (number for sorting)</Label>
        <Input
          id="order"
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value) || 0)}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : initial ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/event-videos">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

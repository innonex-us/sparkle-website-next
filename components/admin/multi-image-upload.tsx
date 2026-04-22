"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type MultiImageUploadProps = {
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
};

export function MultiImageUpload({
  values,
  onChange,
  folder = "uploads",
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setError("");
    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      // Upload sequentially to keep API behavior predictable.
      for (const file of files) {
        const formData = new FormData();
        formData.set("file", file);
        formData.set("folder", folder);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Upload failed");
        }
        uploadedUrls.push(data.url);
      }

      onChange([...values, ...uploadedUrls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        <Upload className="size-4" />
        {uploading ? "Uploading..." : "Upload images"}
      </Button>

      {values.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="relative">
              <div className="relative h-32 w-full overflow-hidden rounded-md border bg-muted">
                <Image
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={url.startsWith("https://res.cloudinary.com")}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                className="absolute -right-2 -top-2"
                onClick={() => removeImage(index)}
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
};

export function ImageUpload({ value, onChange, folder = "uploads" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", folder);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {value ? (
        <div className="relative inline-block">
          <div className="relative h-40 w-64 overflow-hidden rounded-md border bg-muted">
            <Image
              src={value}
              alt="Upload preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("https://res.cloudinary.com")}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon-xs"
            className="absolute -right-2 -top-2"
            onClick={() => onChange("")}
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="size-4" />
          {uploading ? "Uploading…" : "Upload image"}
        </Button>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

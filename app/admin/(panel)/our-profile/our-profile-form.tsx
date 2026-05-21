"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PdfUpload } from "@/components/admin/pdf-upload";

type OurProfileFormProps = {
  currentPdfUrl: string;
};

export function OurProfileForm({ currentPdfUrl }: OurProfileFormProps) {
  const [pdfUrl, setPdfUrl] = useState(currentPdfUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch("/api/site-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PdfUpload value={pdfUrl} onChange={setPdfUrl} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {saved && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Profile PDF saved successfully.
        </p>
      )}
      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </div>
  );
}

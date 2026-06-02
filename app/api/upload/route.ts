import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json(auth.body, { status: auth.status });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) ?? "uploads";

  if (!file?.size) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  // Max file upload limit: 100MB
  const MAX_SIZE = 100 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File size exceeds the 100MB limit" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isPdf = file.type === "application/pdf" || file.name?.endsWith(".pdf");

  try {
    const result = await uploadToCloudinary(buffer, folder, {
      resource_type: isPdf ? "raw" : "image",
    });
    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

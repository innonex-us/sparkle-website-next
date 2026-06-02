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

  if (!file?.size) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  // Max file upload limit: 100MB
  const MAX_SIZE = 100 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File size exceeds the 100MB limit" },
      { status: 400 }
    );
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload PDF to Cloudinary as raw resource in "profile" folder
    const result = await uploadToCloudinary(buffer, "profile", {
      resource_type: "raw",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("PDF upload to Cloudinary error:", error);
    return NextResponse.json(
      { error: "Failed to upload to Cloudinary" },
      { status: 500 }
    );
  }
}

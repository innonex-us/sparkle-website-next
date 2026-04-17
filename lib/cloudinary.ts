import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export type UploadResult = {
  secure_url: string;
  public_id: string;
};

export async function uploadToCloudinary(
  file: Buffer,
  folder: string,
  options?: { resource_type?: "image" | "video" }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `sparkle/${folder}`,
        resource_type: options?.resource_type ?? "image",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) return reject(new Error("No URL returned"));
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id ?? "",
        });
      }
    );
    uploadStream.end(file);
  });
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // Finer breakpoints so slow networks get appropriately smaller images
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    // Allow the quality values we use in <Image quality={...}>
    qualities: [70, 72, 75, 82],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days for external images
  },
};

export default nextConfig;

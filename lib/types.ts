import { ObjectId } from "mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id?: ObjectId;
  name: string;
  images?: string[];
  image: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  _id?: ObjectId;
  title: string;
  image: string;
  /** Optional video URL (YouTube, Vimeo, or direct video link) */
  videoUrl?: string;
  caption?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/** Event videos shown on the home page */
export interface EventVideo {
  _id?: ObjectId;
  title: string;
  videoUrl: string;
  /** Thumbnail image URL (optional, for card display) */
  thumbnail?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

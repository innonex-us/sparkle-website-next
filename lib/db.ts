import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "sparkle";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let client: MongoClient;
let db: Db;

export async function getDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function closeDb(): Promise<void> {
  if (client) await client.close();
}

export const collections = {
  blog: "blog",
  events: "events",
  gallery: "gallery",
  eventVideos: "event_videos",
  admin: "admin",
} as const;

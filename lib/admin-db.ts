import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";

const ADMIN_ID = "credentials";

export interface AdminCredentials {
  _id: string;
  passwordHash: string;
  updatedAt: string;
}

interface AdminDoc {
  _id: string;
  passwordHash: string;
  updatedAt: string;
}

export async function getAdminCredentials(): Promise<AdminCredentials | null> {
  const db = await getDb();
  const doc = await db
    .collection<AdminDoc>(collections.admin)
    .findOne({ _id: ADMIN_ID });
  if (!doc) return null;
  return {
    _id: doc._id,
    passwordHash: doc.passwordHash,
    updatedAt: doc.updatedAt,
  };
}

export async function setAdminPassword(passwordHash: string): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  await db
    .collection<AdminDoc>(collections.admin)
    .updateOne(
      { _id: ADMIN_ID },
      { $set: { passwordHash, updatedAt: now } },
      { upsert: true }
    );
}

export async function ensureAdminExists(initialPasswordHash: string): Promise<void> {
  const existing = await getAdminCredentials();
  if (existing) return;
  await setAdminPassword(initialPasswordHash);
}

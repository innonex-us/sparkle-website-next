import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const ADMIN_COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && !secret) {
    throw new Error("ADMIN_SESSION_SECRET or SESSION_SECRET must be set in production");
  }
  return secret ?? "dev-session-secret-change-in-production";
}

function signPayload(payload: string): string {
  const secret = getSessionSecret();
  const hmac = createHmac("sha256", secret);
  hmac.update(payload);
  return payload + "." + hmac.digest("hex");
}

function verifyAndDecodePayload(signed: string): { admin: true; exp: number } | null {
  const dot = signed.lastIndexOf(".");
  if (dot === -1) return null;
  const payload = signed.slice(0, dot);
  const sig = signed.slice(dot + 1);
  const expected = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  if (sig.length !== expected.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  } catch {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data?.admin !== true || typeof data.exp !== "number") return null;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function setAdminSession(): Promise<void> {
  const exp = Date.now() + COOKIE_MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ admin: true, exp }), "utf8").toString("base64url");
  const signed = signPayload(payload);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  const data = verifyAndDecodePayload(cookie);
  return data !== null;
}

export async function requireAdmin(): Promise<
  { ok: true } | { ok: false; status: number; body: object }
> {
  const ok = await isAdmin();
  if (ok) return { ok: true };
  return { ok: false, status: 401, body: { error: "Unauthorized" } };
}

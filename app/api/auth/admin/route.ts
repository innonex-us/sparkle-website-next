import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { setAdminSession } from "@/lib/admin-auth";
import {
  getAdminCredentials,
  ensureAdminExists,
  setAdminPassword,
} from "@/lib/admin-db";

/** Constant-time compare so login timing does not leak password length hints vs env. */
function timingSafeStringEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = body.password ?? "";

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  try {
    let admin = await getAdminCredentials();
    const initialFromEnv = process.env.ADMIN_PASSWORD;
    if (!admin && initialFromEnv) {
      await ensureAdminExists(await bcrypt.hash(initialFromEnv, 10));
      admin = await getAdminCredentials();
    }
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not configured. Set ADMIN_PASSWORD in .env once to create the first admin, then change password from the panel." },
        { status: 503 }
      );
    }

    let match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      const envPassword = process.env.ADMIN_PASSWORD;
      if (
        envPassword &&
        timingSafeStringEqual(password, envPassword)
      ) {
        await setAdminPassword(await bcrypt.hash(password, 10));
        match = true;
      }
    }
    if (!match) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { setAdminSession } from "@/lib/admin-auth";
import { getAdminCredentials, ensureAdminExists } from "@/lib/admin-db";

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

    const match = await bcrypt.compare(password, admin.passwordHash);
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

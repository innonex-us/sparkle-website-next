"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full justify-start gap-2 text-muted-foreground"
      size="sm"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
      Log out
    </Button>
  );
}

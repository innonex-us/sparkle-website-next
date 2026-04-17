"use client";

import * as DM from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DM.Root;
const DropdownMenuTrigger = DM.Trigger;
const DropdownMenuPortal = DM.Portal;
const DropdownMenuContent = DM.Content;
const DropdownMenuItem = DM.Item;

function DropdownMenuContentStyled({
  className,
  ...props
}: React.ComponentProps<typeof DM.Content>) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuContent
        className={cn(
          "z-50 min-w-[180px] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        sideOffset={6}
        {...props}
      />
    </DropdownMenuPortal>
  );
}

function DropdownMenuItemStyled({
  className,
  ...props
}: React.ComponentProps<typeof DM.Item>) {
  return (
    <DropdownMenuItem
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContentStyled as DropdownMenuContent,
  DropdownMenuItemStyled as DropdownMenuItem,
};
export { ChevronDown };

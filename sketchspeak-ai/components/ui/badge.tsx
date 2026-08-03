import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "brand" | "success" | "warning";
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return <span className={cn("badge", `badge--${tone}`, className)} {...props} />;
}

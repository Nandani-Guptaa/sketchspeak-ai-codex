import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "glass" | "muted";
}

export function Card({ className, tone = "default", ...props }: CardProps) {
  return <div className={cn("card", `card--${tone}`, className)} {...props} />;
}

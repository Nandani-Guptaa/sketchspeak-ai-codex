import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <span className={cn("skeleton", className)} aria-hidden="true" />;
}

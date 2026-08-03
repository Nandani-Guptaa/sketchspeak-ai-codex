import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link className={cn("brand", className)} href="/" aria-label="SketchSpeak AI Studio home">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 34 34" fill="none" role="img">
          <path d="M7.8 20.6 17 5.8l9.2 14.8-9.2 7.2-9.2-7.2Z" fill="currentColor" opacity=".95" />
          <path d="m11.2 18.7 5.8-9.4 5.8 9.4-5.8 4.5-5.8-4.5Z" fill="var(--color-canvas)" />
          <path d="m10.1 24.1 6.9 5.2 6.9-5.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="brand__wordmark">
          SketchSpeak <span>AI</span>
        </span>
      )}
    </Link>
  );
}

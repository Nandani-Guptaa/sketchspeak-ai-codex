import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface FieldLabelProps {
  label: string;
  hint?: string;
  htmlFor?: string;
}

export function FieldLabel({ label, hint, htmlFor }: FieldLabelProps) {
  return (
    <div className="field-label-row">
      <label className="field-label" htmlFor={htmlFor}>
        {label}
      </label>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("input", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("textarea", className)} {...props} />;
}

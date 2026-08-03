"use client";

import { useId, useRef, useState } from "react";
import { FileImage, ImagePlus, RotateCcw, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ImageInput } from "@/lib/generation/types";

interface UploadZoneProps {
  compact?: boolean;
  disabled?: boolean;
  onChange?: (image: ImageInput) => void;
  onClear?: () => void;
  value?: ImageInput | null;
}

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected wireframe."));
    reader.readAsDataURL(file);
  });
}

export function UploadZone({ compact = false, disabled = false, onChange, onClear, value }: UploadZoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectFile = async (file?: File) => {
    if (!file || !onChange) return;
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError("Use a PNG, JPG, WebP, or SVG wireframe.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Keep wireframes under 10 MB.");
      return;
    }

    setError(null);
    const dataUrl = await readFile(file);
    onChange({
      name: file.name,
      mimeType: file.type,
      size: file.size,
      previewUrl: dataUrl,
      dataUrl,
      source: "upload",
    });
  };

  if (value) {
    return (
      <div className={`upload-zone upload-zone--selected${compact ? " upload-zone--compact" : ""}`}>
        <div className="upload-zone__thumb"><img src={value.previewUrl} alt="Selected wireframe preview" /></div>
        <div className="upload-zone__copy">
          <p>{value.name}</p>
          <span>{value.source === "bundled-demo" ? "Bundled demo wireframe" : `${Math.max(1, Math.round(value.size / 1024))} KB · Ready to analyze`}</span>
        </div>
        {onChange ? <Button variant="quiet" size="icon" aria-label="Replace wireframe" disabled={disabled} onClick={() => inputRef.current?.click()}><RotateCcw size={14} aria-hidden="true" /></Button> : null}
        {onClear ? <Button variant="quiet" size="icon" aria-label="Remove wireframe" disabled={disabled} onClick={onClear}><X size={15} aria-hidden="true" /></Button> : null}
        <input ref={inputRef} id={inputId} className="visually-hidden" type="file" accept={ACCEPTED_FILE_TYPES.join(",")} disabled={disabled} onChange={(event) => void selectFile(event.target.files?.[0])} />
      </div>
    );
  }

  return (
    <div
      className={`upload-zone${compact ? " upload-zone--compact" : ""}${isDragging ? " upload-zone--dragging" : ""}${error ? " upload-zone--error" : ""}`}
      onDragEnter={(event) => { event.preventDefault(); if (!disabled && onChange) setIsDragging(true); }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => { event.preventDefault(); setIsDragging(false); void selectFile(event.dataTransfer.files[0]); }}
    >
      <span className="upload-zone__icon" aria-hidden="true">
        {error ? <FileImage size={compact ? 18 : 23} strokeWidth={1.55} /> : <ImagePlus size={compact ? 18 : 23} strokeWidth={1.55} />}
      </span>
      <div className="upload-zone__copy">
        <p>{error ?? "Drop a wireframe here"}</p>
        <span>{error ? "Try a different image or choose a file." : "PNG, JPG, WebP or SVG · up to 10 MB"}</span>
      </div>
      {onChange ? <Button variant="secondary" size="sm" aria-label="Choose a wireframe image to upload" disabled={disabled} onClick={() => inputRef.current?.click()}>
        <Upload size={14} aria-hidden="true" />
        Upload
      </Button> : null}
      {onChange ? <input ref={inputRef} id={inputId} className="visually-hidden" type="file" accept={ACCEPTED_FILE_TYPES.join(",")} disabled={disabled} onChange={(event) => void selectFile(event.target.files?.[0])} /> : null}
    </div>
  );
}

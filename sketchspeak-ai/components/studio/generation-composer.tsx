"use client";

import { AudioLines, ChevronRight, CircleAlert, Sparkles } from "lucide-react";

import { VoiceCapture } from "@/components/studio/voice-capture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { UploadZone } from "@/components/ui/upload-zone";
import type { ImageInput } from "@/lib/generation/types";

interface GenerationComposerProps {
  demoMode: boolean;
  description: string;
  disabled?: boolean;
  error: string | null;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
  onLoadDemo: () => void;
  onWireframeChange: (image: ImageInput) => void;
  onWireframeClear: () => void;
  onVoiceTranscript: (transcript: string) => void;
  wireframe: ImageInput | null;
}

export function GenerationComposer({
  demoMode,
  description,
  disabled = false,
  error,
  onDescriptionChange,
  onGenerate,
  onLoadDemo,
  onVoiceTranscript,
  onWireframeChange,
  onWireframeClear,
  wireframe,
}: GenerationComposerProps) {
  return (
    <section className="studio-quickstart" aria-labelledby="quickstart-title">
      <div className="quickstart-heading">
        <div><span className="section-eyebrow"><span className="section-eyebrow__dot" aria-hidden="true" /> Start with intent</span><h2 id="quickstart-title">Give the studio something to build from</h2></div>
        {demoMode ? <Button variant="quiet" size="sm" onClick={onLoadDemo}><Sparkles size={13} aria-hidden="true" /> Load demo</Button> : <Badge tone="brand">Local workflow</Badge>}
      </div>
      <div className="quickstart-grid">
        <UploadZone disabled={disabled} onChange={onWireframeChange} onClear={onWireframeClear} value={wireframe} />
        <div className="brief-card">
          <div className="brief-card__label"><AudioLines size={15} aria-hidden="true" /><label htmlFor="site-description">Describe the experience</label><kbd>⌘ ↵</kbd></div>
          <Textarea id="site-description" aria-label="Website description" placeholder="A calm, editorial portfolio for an independent creative studio..." value={description} disabled={disabled} onChange={(event) => onDescriptionChange(event.target.value)} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") onGenerate(); }} />
          <div className="brief-card__footer"><VoiceCapture disabled={disabled} onTranscript={onVoiceTranscript} /><Button size="sm" disabled={disabled || (!description.trim() && !wireframe)} onClick={onGenerate}>{disabled ? "Composing" : "Generate"} <ChevronRight size={14} aria-hidden="true" /></Button></div>
        </div>
      </div>
      {error ? <p className="generation-error" role="alert"><CircleAlert size={14} aria-hidden="true" /> {error}</p> : null}
    </section>
  );
}

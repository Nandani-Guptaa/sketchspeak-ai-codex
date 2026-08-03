"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, Monitor, RotateCcw, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

import { GenerationProgress } from "@/components/studio/generation-progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { previewDevices, type GenerationStage, type PreviewDevice } from "@/lib/generation/types";

const devices: Array<{ icon: typeof Smartphone; key: PreviewDevice }> = [
  { icon: Smartphone, key: "mobile" },
  { icon: Tablet, key: "tablet" },
  { icon: Monitor, key: "desktop" },
];

interface PreviewPanelProps {
  currentStage: GenerationStage | null;
  html: string;
  isGenerating: boolean;
  stageIndex: number;
}

export function PreviewPanel({ currentStage, html, isGenerating, stageIndex }: PreviewPanelProps) {
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [reloadKey, setReloadKey] = useState(0);
  const reduceMotion = useReducedMotion();
  const viewport = previewDevices[device];
  const hasPreview = html.length > 0;

  return (
    <section className="studio-panel preview-panel" aria-labelledby="preview-title">
      <div className="studio-panel__header preview-panel__header">
        <div className="panel-title"><span className="panel-title__icon panel-title__icon--violet"><Monitor size={15} aria-hidden="true" /></span><h2 id="preview-title">Live preview</h2><Badge tone={hasPreview ? "success" : "neutral"}>{hasPreview ? "Synced" : "Waiting"}</Badge></div>
        <div className="preview-toolbar">
          <div className="device-switcher" role="group" aria-label="Preview device">
            {devices.map(({ icon: Icon, key }) => <button type="button" className={device === key ? "device-button device-button--active" : "device-button"} aria-pressed={device === key} key={key} onClick={() => setDevice(key)}><Icon size={14} aria-hidden="true" /><span>{previewDevices[key].label}</span></button>)}
          </div>
          <Button variant="quiet" size="icon" aria-label="Refresh preview" disabled={!hasPreview} onClick={() => setReloadKey((value) => value + 1)}><RotateCcw size={14} aria-hidden="true" /></Button>
          <Button variant="quiet" size="icon" aria-label="Expand preview" disabled={!hasPreview}><Maximize2 size={14} aria-hidden="true" /></Button>
        </div>
      </div>
      <div className="preview-panel__stage">
        <AnimatePresence mode="wait">
          {isGenerating ? <GenerationProgress currentStage={currentStage} stageIndex={stageIndex} /> : hasPreview ? (
            <motion.div
              className={`generated-preview generated-preview--${device}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 9, scale: reduceMotion ? 1 : 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              style={{ maxWidth: viewport.width }}
            >
              <div className="generated-preview__chrome"><span><i aria-hidden="true" /> {viewport.label} · {viewport.width}px</span><span>Sandboxed</span></div>
              <iframe key={reloadKey} title={`${viewport.label} website preview`} sandbox="" referrerPolicy="no-referrer" srcDoc={html} />
            </motion.div>
          ) : <EmptyState icon={Monitor} title="Your site will appear here" description="Use a sketch, a clear description, or a voice note to begin composing a responsive webpage." />}
        </AnimatePresence>
        <div className="preview-panel__caption"><span className={hasPreview ? "status-pulse" : "status-pulse status-pulse--idle"} aria-hidden="true" /> {isGenerating ? "Generating in demo mode" : hasPreview ? `${viewport.label} · ${viewport.width} px · Safe iframe preview` : "Responsive preview is ready when you are"}</div>
      </div>
    </section>
  );
}

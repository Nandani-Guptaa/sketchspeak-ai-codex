"use client";

import { useCallback, useEffect, useState } from "react";
import { FileImage, Sparkles } from "lucide-react";

import { CodePanel } from "@/components/studio/code-panel";
import { GenerationComposer } from "@/components/studio/generation-composer";
import { DesignReviewPanel, VersionHistoryPanel } from "@/components/studio/insights-panel";
import { PreviewPanel } from "@/components/studio/preview-panel";
import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { StudioTopbar } from "@/components/studio/studio-topbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { DEMO_MODE, bundledDemoWireframe } from "@/lib/generation/demo";
import type { ImageInput } from "@/lib/generation/types";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useGenerationWorkflow } from "@/hooks/use-generation-workflow";

const demoBrief = "A calm, editorial portfolio for an independent creative studio. Use quiet confidence, warm paper tones, a striking abstract visual, and a simple work-focused call to action.";

export function StudioShell() {
  const [description, setDescription] = useState("");
  const [wireframe, setWireframe] = useState<ImageInput | null>(null);
  const [usedVoice, setUsedVoice] = useState(false);
  const [editableHtml, setEditableHtml] = useState("");
  const { artifact, currentStage, error, generate, isGenerating, stageIndex } = useGenerationWorkflow();
  const debouncedHtml = useDebouncedValue(editableHtml);

  useEffect(() => {
    if (artifact) setEditableHtml(artifact.html);
  }, [artifact]);

  const handleVoiceTranscript = useCallback((transcript: string) => {
    setUsedVoice(true);
    setDescription((current) => current ? `${current.trim()} ${transcript}` : transcript);
  }, []);

  const handleGenerate = useCallback(() => {
    void generate({ description, wireframe, usedVoice });
  }, [description, generate, usedVoice, wireframe]);

  const loadDemo = useCallback(() => {
    setDescription(demoBrief);
    setWireframe(bundledDemoWireframe);
    setUsedVoice(false);
  }, []);

  return (
    <div className="studio-app">
      <StudioSidebar />
      <div className="studio-app__main">
        <StudioTopbar />
        <main className="studio-workspace">
          <div className="studio-welcome">
            <div><div className="studio-welcome__eyebrow"><Sparkles size={13} aria-hidden="true" /> Your canvas</div><h1>Turn a thought into a webpage you can keep shaping.</h1><p>Bring a sketch, say what you&apos;re imagining, and inspect the responsive result in one quiet workspace.</p></div>
            <div className="studio-welcome__stats"><span><b>{DEMO_MODE ? "Demo" : "Local"}</b> generation mode</span><span><b>3</b> viewports</span><span><b>∞</b> edits</span></div>
          </div>

          <GenerationComposer demoMode={DEMO_MODE} description={description} disabled={isGenerating} error={error} onDescriptionChange={setDescription} onGenerate={handleGenerate} onLoadDemo={loadDemo} onVoiceTranscript={handleVoiceTranscript} onWireframeChange={setWireframe} onWireframeClear={() => setWireframe(null)} wireframe={wireframe} />

          <div className="studio-layout">
            <div className="studio-layout__primary"><PreviewPanel currentStage={currentStage} html={debouncedHtml} isGenerating={isGenerating} stageIndex={stageIndex} /><div className="studio-layout__lower"><CodePanel isPreviewPending={editableHtml !== debouncedHtml} onChange={setEditableHtml} value={editableHtml} /><section className="studio-panel future-panel" aria-labelledby="future-title"><div className="studio-panel__header"><div className="panel-title"><span className="panel-title__icon panel-title__icon--neutral"><FileImage size={15} aria-hidden="true" /></span><h2 id="future-title">Project assets</h2></div><Badge>Coming soon</Badge></div><EmptyState icon={FileImage} title="References, kept in context" description="Uploaded sketches and visual assets will stay connected to each project here." /></section></div></div>
            <aside className="studio-layout__aside" aria-label="Project insights"><DesignReviewPanel /><VersionHistoryPanel /><Card tone="glass" className="studio-aside-note"><span><Sparkles size={15} aria-hidden="true" /></span><div><b>Demo mode is on</b><p>Try the bundled wireframe to see the complete generation loop without an API key.</p></div></Card></aside>
          </div>
        </main>
      </div>
    </div>
  );
}

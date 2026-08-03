"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { Braces, Check, Code2, Copy, Eye, FileCode2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

interface CodePanelProps {
  isPreviewPending: boolean;
  onChange: (value: string) => void;
  value: string;
}

export function CodePanel({ isPreviewPending, onChange, value }: CodePanelProps) {
  const hasCode = value.length > 0;

  return (
    <section className="studio-panel code-panel" aria-labelledby="code-title">
      <div className="studio-panel__header">
        <div className="panel-title"><span className="panel-title__icon panel-title__icon--cyan"><Code2 size={15} aria-hidden="true" /></span><h2 id="code-title">Code</h2>{hasCode ? <Badge tone="success"><Check size={11} aria-hidden="true" /> Live</Badge> : <Badge>Waiting</Badge>}</div>
        <div className="panel-inline-actions"><Button variant="quiet" size="icon" aria-label="Copy code" disabled={!hasCode} onClick={() => void navigator.clipboard?.writeText(value)}><Copy size={14} aria-hidden="true" /></Button></div>
      </div>
      {hasCode ? (
        <>
          <div className="code-tabs" role="tablist" aria-label="Code files"><button type="button" role="tab" aria-selected="true"><FileCode2 size={13} aria-hidden="true" /> index.html <span /></button><button type="button" role="tab" aria-selected="false" disabled><Braces size={13} aria-hidden="true" /> Generated artifact</button></div>
          <div className="code-editor-shell"><CodeMirror aria-label="Generated HTML editor" className="code-editor" value={value} height="248px" theme="dark" extensions={[html()]} basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLineGutter: false }} onChange={onChange} /></div>
          <div className="code-panel__footer"><span><Eye size={13} aria-hidden="true" /> {isPreviewPending ? "Updating preview..." : "Preview synced"}</span><span>Debounced · 350 ms</span></div>
        </>
      ) : <EmptyState icon={Code2} title="Your code will live here" description="Generate from a wireframe, a description, or both to open a fully editable HTML artifact." />}
    </section>
  );
}

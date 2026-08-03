"use client";

import { Accessibility, ArrowUpRight, Check, ChevronRight, Clock3, Palette, Sparkles, Type, Undo2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const reviewItems = [
  { icon: Accessibility, label: "Accessibility", score: "96", progress: "96%", tone: "success" },
  { icon: Type, label: "Typography", score: "88", progress: "88%", tone: "brand" },
  { icon: Palette, label: "Color harmony", score: "91", progress: "91%", tone: "cyan" },
];

const versions = [
  { name: "Studio foundation", meta: "Just now", active: true },
  { name: "Landing direction", meta: "12 min ago" },
  { name: "Initial brief", meta: "24 min ago" },
];

export function DesignReviewPanel() {
  return (
    <section className="studio-panel review-panel" aria-labelledby="review-title">
      <div className="studio-panel__header"><div className="panel-title"><span className="panel-title__icon panel-title__icon--pink"><Sparkles size={15} aria-hidden="true" /></span><h2 id="review-title">AI design review</h2></div><Button variant="quiet" size="icon" aria-label="Open design review"><ArrowUpRight size={15} aria-hidden="true" /></Button></div>
      <div className="review-overview">
        <div className="review-score"><span><b>92</b><small>/100</small></span><em>Strong</em></div>
        <p>A clear starting point with a confident visual rhythm.</p>
      </div>
      <div className="review-list">
        {reviewItems.map(({ icon: Icon, label, score, progress, tone }) => <div className="review-item" key={label}><span className={`review-item__icon review-item__icon--${tone}`}><Icon size={14} aria-hidden="true" /></span><div><span>{label}</span><i><b style={{ width: progress }} /></i></div><strong>{score}</strong></div>)}
      </div>
      <button className="review-recommendation" type="button"><span><Check size={13} aria-hidden="true" /></span> Structure is ready for a first generation <ChevronRight size={14} aria-hidden="true" /></button>
    </section>
  );
}

export function VersionHistoryPanel() {
  return (
    <section className="studio-panel versions-panel" aria-labelledby="versions-title">
      <div className="studio-panel__header"><div className="panel-title"><span className="panel-title__icon panel-title__icon--amber"><Clock3 size={15} aria-hidden="true" /></span><h2 id="versions-title">Version history</h2><Badge>3</Badge></div><Button variant="quiet" size="icon" aria-label="Open version history"><ArrowUpRight size={15} aria-hidden="true" /></Button></div>
      <ol className="version-list">
        {versions.map(({ name, meta, active }) => <li className={active ? "version-item version-item--active" : "version-item"} key={name}><span className="version-item__line" aria-hidden="true"><i /></span><div><b>{name}</b><small>{meta}</small></div>{active ? <Badge tone="brand">Current</Badge> : <button type="button" aria-label={`Restore ${name}`}><Undo2 size={13} aria-hidden="true" /></button>}</li>)}
      </ol>
    </section>
  );
}

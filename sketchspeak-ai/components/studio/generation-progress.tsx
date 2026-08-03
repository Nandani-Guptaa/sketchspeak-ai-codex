"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { generationStages, type GenerationStage } from "@/lib/generation/types";

interface GenerationProgressProps {
  currentStage: GenerationStage | null;
  stageIndex: number;
}

export function GenerationProgress({ currentStage, stageIndex }: GenerationProgressProps) {
  const reduceMotion = useReducedMotion();
  const progress = Math.max(6, ((stageIndex + 0.5) / generationStages.length) * 100);

  return (
    <motion.div
      className="generation-progress"
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      role="status"
      aria-live="polite"
      aria-label={currentStage ?? "Preparing generation"}
    >
      <div className="generation-progress__hero"><span className="generation-progress__orb"><Sparkles size={18} aria-hidden="true" /></span><div><span>SketchSpeak is composing</span><strong>{currentStage ?? "Preparing your canvas"}</strong></div></div>
      <div className="generation-progress__meter"><i style={{ width: `${progress}%` }} /></div>
      <ol className="generation-progress__stages">
        {generationStages.map((stage, index) => <li className={index < stageIndex ? "generation-stage generation-stage--complete" : index === stageIndex ? "generation-stage generation-stage--active" : "generation-stage"} key={stage}><span>{index < stageIndex ? <Check size={10} aria-hidden="true" /> : index + 1}</span>{stage}</li>)}
      </ol>
    </motion.div>
  );
}

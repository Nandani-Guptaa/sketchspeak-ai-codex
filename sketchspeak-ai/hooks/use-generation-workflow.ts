"use client";

import { useCallback, useState } from "react";

import { DEMO_MODE, generateDemoArtifact } from "@/lib/generation/demo";
import { createGenerationRequest } from "@/lib/generation/request";
import type { GeneratedArtifact, GenerationStage, ImageInput } from "@/lib/generation/types";

interface GenerationInput {
  description: string;
  wireframe: ImageInput | null;
  usedVoice: boolean;
}

export function useGenerationWorkflow() {
  const [artifact, setArtifact] = useState<GeneratedArtifact | null>(null);
  const [currentStage, setCurrentStage] = useState<GenerationStage | null>(null);
  const [stageIndex, setStageIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async ({ description, wireframe, usedVoice }: GenerationInput) => {
    if (!description.trim() && !wireframe) {
      setError("Add a wireframe, a description, or both before generating.");
      return null;
    }

    setError(null);
    setIsGenerating(true);
    setStageIndex(0);
    const request = createGenerationRequest({ description, wireframe, usedVoice, demoMode: DEMO_MODE });

    try {
      const nextArtifact = await generateDemoArtifact(request, (stage, index) => {
        setCurrentStage(stage);
        setStageIndex(index);
      });
      setArtifact(nextArtifact);
      return nextArtifact;
    } catch {
      setError("Generation paused unexpectedly. Your input is still here—please try again.");
      return null;
    } finally {
      setIsGenerating(false);
      setCurrentStage(null);
      setStageIndex(-1);
    }
  }, []);

  return { artifact, currentStage, error, generate, isGenerating, stageIndex };
}

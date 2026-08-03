import type { GenerationRequest, ImageInput } from "@/lib/generation/types";

interface CreateGenerationRequestInput {
  description: string;
  wireframe: ImageInput | null;
  usedVoice: boolean;
  demoMode: boolean;
}

export function createGenerationRequest({
  description,
  wireframe,
  usedVoice,
  demoMode,
}: CreateGenerationRequestInput): GenerationRequest {
  const hasText = description.trim().length > 0;

  return {
    requestId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    mode: demoMode ? "demo" : "local",
    prompt: {
      description: description.trim(),
      source: usedVoice && hasText ? "mixed" : usedVoice ? "voice" : "text",
    },
    wireframe,
    output: {
      format: "standalone-html",
      responsive: true,
      viewports: ["mobile", "tablet", "desktop"],
    },
  };
}

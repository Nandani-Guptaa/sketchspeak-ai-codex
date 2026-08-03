export const generationStages = [
  "Analyzing sketch",
  "Understanding layout",
  "Generating components",
  "Optimizing responsiveness",
  "Finalizing",
] as const;

export type GenerationStage = (typeof generationStages)[number];
export type PreviewDevice = "mobile" | "tablet" | "desktop";

export const previewDevices: Record<PreviewDevice, { label: string; width: number; height: number }> = {
  mobile: { label: "Mobile", width: 390, height: 760 },
  tablet: { label: "Tablet", width: 768, height: 700 },
  desktop: { label: "Desktop", width: 1440, height: 860 },
};

export interface ImageInput {
  name: string;
  mimeType: string;
  size: number;
  previewUrl: string;
  dataUrl?: string;
  source: "upload" | "bundled-demo";
}

export interface GenerationRequest {
  requestId: string;
  createdAt: string;
  mode: "demo" | "local";
  prompt: {
    description: string;
    source: "text" | "voice" | "mixed";
  };
  wireframe: ImageInput | null;
  output: {
    format: "standalone-html";
    responsive: true;
    viewports: PreviewDevice[];
  };
}

export interface GeneratedArtifact {
  id: string;
  name: string;
  html: string;
  generatedAt: string;
  request: GenerationRequest;
}

import { generationStages, type GeneratedArtifact, type GenerationRequest, type GenerationStage } from "@/lib/generation/types";

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

export const bundledDemoWireframe = {
  name: "atelier-wireframe.svg",
  mimeType: "image/svg+xml",
  size: 4620,
  previewUrl: "/demo/atelier-wireframe.svg",
  source: "bundled-demo" as const,
};

const sampleWebsite = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Atelier — A quieter kind of work</title>
    <style>
      :root { color-scheme: light; --ink: #1f1e20; --paper: #f2efe7; --muted: #77736e; --line: rgba(31, 30, 32, .16); --plum: #7557bd; }
      * { box-sizing: border-box; }
      body { margin: 0; color: var(--ink); background: var(--paper); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .site { min-height: 100vh; overflow: hidden; }
      nav { display: flex; height: 76px; align-items: center; justify-content: space-between; max-width: 1180px; margin: auto; padding: 0 38px; border-bottom: 1px solid var(--line); }
      .brand { font-size: 17px; font-weight: 800; letter-spacing: -.095em; }
      .links { display: flex; align-items: center; gap: 28px; font-size: 12px; }
      .links a { color: inherit; text-decoration: none; }
      .links a:last-child { padding: 9px 13px; color: #f7f4ef; border-radius: 4px; background: #29272b; }
      .hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(330px, .82fr); min-height: 575px; max-width: 1180px; margin: auto; border-bottom: 1px solid var(--line); }
      .copy { padding: clamp(75px, 10vw, 138px) 38px 58px; }
      .eyebrow { color: #625e59; font-size: 10px; font-weight: 700; letter-spacing: .15em; }
      h1 { max-width: 620px; margin: 22px 0 18px; font-size: clamp(47px, 6vw, 84px); font-weight: 540; letter-spacing: -.078em; line-height: .9; }
      h1 em { color: var(--plum); font-style: normal; }
      .copy p { max-width: 390px; color: var(--muted); font-size: 15px; line-height: 1.65; }
      .copy button { margin-top: 24px; padding: 0 0 6px; color: var(--ink); border: 0; border-bottom: 1px solid currentColor; background: none; font-size: 12px; font-weight: 700; }
      .art { position: relative; overflow: hidden; min-height: 300px; background: radial-gradient(circle at 55% 35%, #f5bda4 0 8%, transparent 8.3%), linear-gradient(135deg, #a49abb, #cbb8a5 48%, #8a80a4); }
      .art::before { position: absolute; inset: 0; content: ""; opacity: .38; background-image: linear-gradient(rgba(255,255,255,.38) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.38) 1px, transparent 1px); background-size: 34px 34px; }
      .orb { position: absolute; width: 54%; aspect-ratio: 1; border: 1px solid rgba(255,255,255,.78); border-radius: 50%; background: linear-gradient(145deg, #6652bf, #d975aa); mix-blend-mode: overlay; }
      .orb-one { top: 20%; left: 12%; }.orb-two { right: -15%; bottom: -18%; width: 74%; border: 0; background: #efba78; }
      .line { position: absolute; top: 33%; right: -20%; width: 120%; height: 1px; background: rgba(35, 27, 54, .45); transform: rotate(-37deg); }
      .metrics { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1180px; margin: auto; }.metric { padding: 28px 38px; border-right: 1px solid var(--line); color: var(--muted); font-size: 11px; }.metric:last-child { border-right: 0; }.metric strong { display: block; margin-bottom: 4px; color: var(--ink); font-size: 26px; font-weight: 570; letter-spacing: -.06em; }
      @media (max-width: 700px) { nav { height: 60px; padding: 0 20px; }.links a:not(:last-child) { display: none; }.hero { grid-template-columns: 1fr; min-height: 0; }.copy { padding: 74px 22px 54px; }.art { min-height: 310px; }.metrics { grid-template-columns: 1fr 1fr; }.metric { padding: 21px; }.metric:last-child { grid-column: span 2; border-top: 1px solid var(--line); } }
    </style>
  </head>
  <body>
    <main class="site">
      <nav><div class="brand">ATELIER.</div><div class="links"><a href="#work">Work</a><a href="#about">Approach</a><a href="#contact">Start a project ↗</a></div></nav>
      <section class="hero"><div class="copy"><div class="eyebrow">A CREATIVE PARTNERSHIP</div><h1>Make space for work that <em>matters.</em></h1><p>We help considered teams make digital experiences with character, clarity, and a reason to exist.</p><button>Explore our selected work ↗</button></div><div class="art" aria-hidden="true"><i class="orb orb-one"></i><i class="orb orb-two"></i><i class="line"></i></div></section>
      <section class="metrics"><div class="metric"><strong>28</strong>global recognitions</div><div class="metric"><strong>14</strong>selected projects</div><div class="metric"><strong>08</strong>years of careful craft</div></section>
    </main>
  </body>
</html>`;

const stageDelays: Record<GenerationStage, number> = {
  "Analyzing sketch": 850,
  "Understanding layout": 900,
  "Generating components": 1100,
  "Optimizing responsiveness": 850,
  "Finalizing": 650,
};

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export async function generateDemoArtifact(
  request: GenerationRequest,
  onStage: (stage: GenerationStage, index: number) => void,
): Promise<GeneratedArtifact> {
  for (const [index, stage] of generationStages.entries()) {
    onStage(stage, index);
    await wait(stageDelays[stage]);
  }

  return {
    id: crypto.randomUUID(),
    name: "Atelier landing page",
    html: sampleWebsite,
    generatedAt: new Date().toISOString(),
    request,
  };
}

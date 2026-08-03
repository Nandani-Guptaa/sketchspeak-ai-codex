# SketchSpeak AI Studio — Product & Engineering Plan

> **Tagline:** Design. Talk. Build.
> **Product thesis:** A creator should be able to turn an early idea—whether sketched or spoken—into a refined, responsive, inspectable website without having to translate intent across a chain of disconnected design and development tools.

## 1. Product Vision

SketchSpeak AI Studio is a premium AI creation workspace that transforms visual and spoken intent into production-ready web experiences. It combines multimodal generation, a high-confidence editing loop, and design intelligence in one calm, professional studio.

The product should feel less like a prompt playground and more like a focused creative operating system:

- **Input-native:** begin from a wireframe upload, a spoken brief, a text prompt, or a deliberate combination of all three.
- **Generation with control:** generate a complete website, then make precise conversational changes while retaining editable source.
- **Quality-aware:** expose why the result works, where it falls short, and how it performs across form factors.
- **Trustworthy:** every meaningful change becomes a restorable version; exports remain portable HTML/CSS/JS instead of a locked-in artifact.
- **Premium by design:** dark, restrained, glass-accented surfaces; deliberate typography; smooth but economical motion; no noisy dashboards or novelty AI theatrics.

The initial launch target is solo founders, product designers, and front-end developers who need to go from rough direction to a credible web prototype in minutes. The hackathon demonstration should make the full loop tangible: sketch → describe → generate → refine by voice → inspect → restore → export.

### Product principles

1. **Intent before implementation:** ask for only the critical missing context, then give the user a strong first result.
2. **Editable by default:** generated output is understandable source, never an opaque image or one-way artifact.
3. **Progressive disclosure:** advanced controls appear when useful; the first session stays uncluttered.
4. **Show the AI’s work:** generation status, changed files, quality signals, and version lineage are visible and legible.
5. **Fast feedback wins:** the preview should react immediately to code edits and retain the user’s creative flow.
6. **Accessibility is product quality:** accessible contrast, focus behavior, semantics, and responsive design are evaluated—not treated as a late-stage checkbox.

## 2. User Journey

### Primary journey: from rough concept to export

| Stage | User action | Studio response | Success signal |
| --- | --- | --- | --- |
| 1. Land | Opens the studio or creates a project | Shows a concise welcome canvas with three clear starting methods: wireframe, voice, or text | User knows how to begin without onboarding friction |
| 2. Capture intent | Uploads a hand-drawn wireframe and/or records a spoken description | Validates the asset, transcribes speech live, and lets the user correct the brief before submitting | Input is clear, reversible, and visible |
| 3. Configure | Selects optional website type, target audience, brand tone, and device priority | Uses opinionated defaults and labels the expected output scope | User feels guided rather than constrained |
| 4. Generate | Starts generation | Presents a concise staged progress state: understand → structure → build → validate | The wait feels intentional and transparent |
| 5. Review | Enters the studio workspace | Opens desktop preview, code editor, conversation panel, and project context in a stable three-pane layout | A credible first website is immediately inspectable |
| 6. Refine | Types or says “make the pricing section calmer and more enterprise” | Produces a scoped change summary, applies a new version, highlights changed code, refreshes preview | User can see exactly what changed |
| 7. Evaluate | Opens Design Review | Scores and explains accessibility, hierarchy, spacing, typography, color harmony, and responsiveness | Feedback is actionable, not generic |
| 8. Transform | Applies a visual theme such as Vercel Style | Previews transformation before commit; preserves content and layout intent | Theme change feels controlled, not destructive |
| 9. Compare / restore | Opens version history and compares revisions | Shows visual and source-level differences; restores into a new current version | No creative step feels risky |
| 10. Validate | Switches phone, tablet, and desktop modes | Renders each size in the same safe preview shell and surfaces responsive review findings | User trusts the output beyond a single viewport |
| 11. Export | Downloads the current website as standalone HTML | Packages a clean, runnable export with required assets and a concise readiness summary | Export works locally without Studio access |

### Supporting journeys

- **Text-only start:** A developer pastes a concise site brief, chooses a style direction, and obtains the same editable workspace without an image or microphone.
- **Recovery journey:** A generation fails or a spoken transcript is unclear; the draft and inputs remain intact, the system gives a useful retry path, and no work is lost.
- **Review-first journey:** A user brings in generated code, requests a design review, reads prioritized fixes, and iterates from those recommendations.

## 3. Complete Feature List

### Required Features

- Create, rename, and revisit browser-local projects in the MVP; reserve a repository abstraction so authenticated cloud projects can follow without a rewrite.
- Upload a hand-drawn wireframe image (PNG, JPEG, WebP) with file validation, preview, replacement, and removal controls.
- Capture a spoken description through the Web Speech API, with live interim transcript, final transcript, restart, browser-support messaging, and text fallback.
- Enter or edit a written design brief before generation.
- Generate a responsive website from the multimodal brief using the OpenAI API through server-side routes.
- Display generation progress with human-readable stages and recoverable failure states.
- Render the generated website in an isolated live preview.
- Provide an editable HTML/CSS/JS code workspace using CodeMirror, including tabs, syntax highlighting, undo/redo, keyboard support, and dirty state feedback.
- Apply text or voice refinement instructions to the current generated site.
- Preserve responsive behavior through desktop, tablet, and mobile preview modes.
- Export the current result as a standalone HTML file; include compatible inline styles and scripts so the export is portable.

### Premium Features

- **AI Design Review:** structured quality report with accessibility score, visual hierarchy, spacing, typography, color harmony, responsiveness, prioritized suggestions, severity, and expected impact.
- **Theme Transformer:** one-click, previewable transformations for Modern Startup, Apple Style, Vercel Style, Material, and Minimal; retain semantic content and primary information architecture.
- **Version History:** automatic snapshot after every generation, refinement, theme transformation, and material code save; named entries, timestamps, origin labels, visual comparison, and restore.
- **Responsive Preview:** framed phone, tablet, desktop, and fluid-width modes; device labels; scale-to-fit; optional side-by-side breakpoint review.
- **Explain My Design:** section-level explanations that connect user intent to layout, component choice, visual hierarchy, accessibility considerations, and responsive behavior.
- Generation plan before execution: allow the user to see and edit the interpreted site outline, target audience, style traits, and section map.
- Diff-aware refinement: identify the parts of code and preview affected by an AI request.
- Project command palette for generation, preview device selection, export, review, themes, and version restore.
- Shareable read-only preview link architecture (feature-flagged until authentication and storage are enabled).
- Export-readiness panel that flags unsupported external assets or manual code errors before download.

### Stretch Features

- Direct image and logo asset generation with permissions-aware replacement workflow.
- Component-level lock / protect mode to prevent AI refinements from changing approved sections.
- Multi-page generation with an information architecture map and navigable previews.
- Figma file or screenshot import pathway, subject to legal and technical validation.
- Collaborative comments, reviewer links, and approval checkpoints.
- Bring-your-own-brand kit: fonts, colors, logo, component constraints, and voice.
- GitHub export, repository bootstrap, and deploy-to-Vercel flow.
- A/B theme comparison with generated rationale and configurable scoring weights.
- Design system extraction from an approved website.
- Analytics-informed refinement suggestions for deployed projects.

## 4. Technical Architecture

### Application shape

Use a Next.js App Router application with TypeScript. The browser owns interaction-heavy studio state, while Next.js Route Handlers own all OpenAI calls, schema validation, output normalization, and rate-limit boundaries.

| Layer | Responsibility | Key choices |
| --- | --- | --- |
| Presentation | Landing, project setup, studio workspace, overlays, empty/error states | Server-rendered shells where practical; client components only for interactive surfaces |
| Client domain | Project editing, generation lifecycle, code buffers, preview selection, version navigation | Lightweight typed store with selectors and browser persistence adapter |
| Preview runtime | Safe rendering of generated output | Sandboxed iframe with controlled `srcDoc`, restrictive permissions, and an explicit message contract |
| API boundary | Generation, refinement, review, theme transformation, explanation, export validation | Route Handlers, Zod request/response schemas, server-only OpenAI client |
| AI orchestration | Transform multimodal intent into validated website artifacts | Prompt templates by task, structured JSON output, repair pass for malformed results, input/output guardrails |
| Persistence | MVP project data and uploaded image representation | Repository interface; local implementation first, cloud-backed implementation later |
| Observability | Error context, request timing, quality events | Structured server logging, privacy-safe analytics events, optional error reporting integration |

### AI response contract

Every model capability produces a typed, versioned artifact rather than unstructured prose. A generated website artifact contains the code files, site metadata, section map, design tokens, responsive notes, asset references, warnings, and an explanation map. Review, transformation, and refinement each return a similarly typed delta plus user-facing rationale. The client accepts only data that passes schema validation.

### AI orchestration safeguards

- Keep API keys and model invocation on the server; never expose them to browser code or exports.
- Send the original user brief, normalized image input, current artifact summary, and selected style constraints—not unbounded prior conversation.
- Require strict structured output, then validate it before a preview receives any code.
- Reject disallowed remote protocols, unsafe HTML constructs, oversized output, and malformed artifacts before rendering.
- Use a bounded repair attempt for schema failures; otherwise return an actionable error with the draft untouched.
- Record request IDs, stage timing, and safe metadata for debugging without storing raw voice or image data by default.

## 5. Folder Structure

The following is the intended modular layout. Directories are deliberately organized by responsibility; feature components may not import another feature’s private internals.

```text
app/
  (marketing)/                 # Premium product landing and pricing-ready pages
  (studio)/                    # Auth-ready studio route group
    project/[projectId]/        # Main workspace route
  api/
    projects/                  # Project lifecycle boundary
    generate/                  # Initial multimodal website generation
    refine/                    # Voice/text change requests
    review/                    # Design-quality analysis
    transform-theme/           # Theme transformer
    explain/                   # Explain My Design
    export/                    # Export validation and packaging support
  layout.tsx                   # Application shell
  globals.css                  # Layered design tokens and global foundations

components/
  ui/                          # Primitive, reusable accessible UI controls
  layout/                      # App shell, navigation, panels, responsive scaffolding
  studio/                      # Workspace composition only
  input/                       # Wireframe, voice, and brief capture components
  preview/                     # Iframe preview and device framing
  editor/                      # Code editor integration and file navigation
  conversation/                # Refinement chat and input controls
  review/                      # Review scorecard and recommendations
  versions/                    # Timeline, compare, restore interfaces
  themes/                      # Theme gallery and transformation preview
  explain/                     # Design explanation views

features/
  projects/                    # Project domain operations and public types
  generation/                  # Generation workflow and serializers
  refinement/                  # Refinement workflow and change summaries
  design-review/               # Review domain logic
  versions/                    # Snapshot and restore domain logic
  export/                      # Portable HTML assembly and validation

lib/
  ai/                          # OpenAI client, prompts, response parsers
  validation/                  # Zod schemas and shared contracts
  preview/                     # Sanitization and iframe document assembly
  storage/                     # Persistence repository interfaces and adapters
  telemetry/                   # Logging and analytics abstractions
  utils/                       # Small, focused utilities

stores/                        # Client state store and selectors
hooks/                         # Reusable UI and browser capability hooks
types/                         # Cross-domain TypeScript declarations
styles/                        # Token definitions and animation utilities
public/                        # Static, non-sensitive product assets
tests/                         # Unit, integration, accessibility, and E2E suites
```

## 6. Component Hierarchy

```text
AppShell
├── MarketingExperience
│   ├── Hero / ProductDemo
│   ├── FeatureNarrative
│   └── CallToAction
└── StudioShell
    ├── StudioTopbar
    │   ├── ProjectIdentity
    │   ├── SaveStatus
    │   ├── CommandPaletteTrigger
    │   └── ExportMenu
    ├── ProjectSetup (before first generation)
    │   ├── InputMethodTabs
    │   ├── WireframeUploader
    │   ├── VoiceCapture
    │   ├── BriefEditor
    │   └── GenerationConfigurator
    └── StudioWorkspace (after first generation)
        ├── ContextRail
        │   ├── SectionOutline
        │   ├── ThemeTrigger
        │   ├── DesignReviewTrigger
        │   └── VersionHistoryTrigger
        ├── PreviewPane
        │   ├── PreviewToolbar
        │   ├── ResponsiveDeviceSwitcher
        │   └── SandboxedPreviewFrame
        ├── EditorPane
        │   ├── FileTabs
        │   └── CodeEditor
        ├── RefinementPane
        │   ├── ConversationThread
        │   └── MultimodalRefinementComposer
        └── ContextualDrawer
            ├── DesignReviewPanel
            ├── ThemeTransformerPanel
            ├── VersionHistoryPanel
            └── ExplainDesignPanel
```

The primary workspace must remain usable at narrower desktop widths. On small screens, secondary panes become focusable full-screen sheets rather than squeezing into an unusable three-column layout.

## 7. API Design

All endpoints are versioned internally, implemented as Next.js Route Handlers, authenticated when accounts launch, rate-limited by user/IP, and protected by Zod validation. Responses use a consistent envelope with `data`, `requestId`, and a machine-readable `error` object when applicable.

| Endpoint | Method | Purpose | Request highlights | Response highlights |
| --- | --- | --- | --- | --- |
| `/api/projects` | POST | Create a project shell | name, optional initial brief | project ID and initial metadata |
| `/api/projects/[projectId]` | GET / PATCH | Retrieve or update project metadata | project name, preferences | project summary and current version pointer |
| `/api/generate` | POST | Create first website artifact | project ID, brief, normalized image, generation preferences | artifact, interpreted plan, version, warnings |
| `/api/refine` | POST | Apply text or voice-derived instruction | project ID, base version ID, instruction, optional selected section | updated artifact, change summary, new version |
| `/api/review` | POST | Analyze current design | project ID, version ID, artifact summary, target breakpoints | scorecard, findings, prioritized suggestions |
| `/api/transform-theme` | POST | Transform current visual system | project ID, base version ID, theme preset | proposed/committed artifact, applied token summary, new version |
| `/api/explain` | POST | Explain section and design decisions | project ID, version ID, optional section ID | structured explanation map |
| `/api/projects/[projectId]/versions` | GET | Read version timeline | pagination cursor | version summaries and timestamps |
| `/api/projects/[projectId]/versions/[versionId]/restore` | POST | Restore historical version | restore note | restored current artifact as a new version |
| `/api/export` | POST | Validate and package export | project ID, version ID, export options | downloadable export payload or readiness errors |

### Data contracts

- **Project:** identity, name, creation/update timestamps, current version ID, user preferences, and optional source input metadata.
- **Website Artifact:** file collection, page metadata, section map, design token map, warnings, generation provenance, and artifact schema version.
- **Version:** immutable artifact reference, parent version ID, created timestamp, origin (`generation`, `refinement`, `theme`, `manual-save`, `restore`), human-readable label, and change summary.
- **Design Review:** overall score, category scores, evidence, severity-ranked findings, and suggested fixes tied to section IDs where possible.
- **API Error:** stable error code, safe message, retryable flag, request ID, and field-level validation errors when appropriate.

No route trusts user-supplied project ownership, version IDs, generated code, or MIME types. Each is verified at its boundary.

## 8. State Management

### State ownership

| State category | Owner | Persistence | Notes |
| --- | --- | --- | --- |
| Route identity and server-fetched project metadata | Next.js route / server data boundary | Project repository | Revalidate after committed server mutations |
| Active website artifact and current version | Studio client store | Repository plus optimistic local cache | Core shared workspace state |
| Code editor buffers and dirty state | Editor feature state | Debounced local persistence; commit creates a version | Avoids network writes on every keystroke |
| Generation/refinement/review request lifecycle | Async action state | Ephemeral | Includes stage, cancellation, request ID, and error |
| Preview device, pane layout, selected file, drawer | UI preference store | Local storage | User preference, not project content |
| Voice recognition interim result | Voice capture hook | Ephemeral | Final transcript is copied deliberately into the composer |
| Toasts, dialogs, keyboard command state | Local UI state | Ephemeral | Isolated from domain store |

Use a small selector-based client store rather than a large global reducer. Server responses remain authoritative. Mutations apply a validated optimistic update only when the resulting artifact can be rolled back cleanly; otherwise the UI holds a non-destructive pending state until confirmation.

### Version policy

AI-originated actions always create a version. Manual code changes create a version when the user explicitly saves, exports, triggers a new AI action, changes projects, or has been idle after a meaningful debounce interval. This balances safety with a readable history.

## 9. UI Architecture

### Visual system

The UI takes cues from Linear’s clarity, Vercel’s contrast discipline, Framer’s creative confidence, Raycast’s keyboard fluency, and Stripe’s data legibility—without visually copying any one product.

- **Canvas:** near-black blue-charcoal foundation, with elevated surfaces in translucent graphite.
- **Color:** one cool indigo-to-violet action gradient, restrained cyan for active technical states, semantic colors with accessible contrast.
- **Glass:** glassmorphism is limited to shell surfaces and overlays; code, text, and review data use more opaque backgrounds for readability.
- **Typography:** a modern sans for UI, a high-legibility monospace for code, clear size steps, generous line-height, and compact labels only where they earn their density.
- **Shape:** 12–20px corner radii, fine low-contrast borders, soft shadows reserved for focused layers.
- **Motion:** Framer Motion transitions communicate hierarchy changes, progress, and drawer movement. Honor reduced-motion preferences; never make motion delay input or content access.

### Interaction architecture

- A persistent top bar establishes project identity, save state, command access, and export.
- The workspace uses stable panes so a preview does not jump when a review panel opens.
- Keyboard shortcuts support command palette, preview device switching, focus movement among panes, save, undo/redo, and export.
- Every asynchronous button has a clear busy state and remains understandable to assistive technology.
- Empty states teach the next action in one sentence and provide a primary action; they do not use decorative filler.
- Error states preserve the user’s input, say what failed in plain language, and offer appropriate retry, edit, or fallback actions.

### Responsive behavior of the Studio

The website output is responsive, and the Studio itself must be responsive too. Above the large-desktop breakpoint it uses the full multi-pane composition. At mid-widths it collapses the context rail into a drawer and makes code/preview tabs switchable. On mobile, project setup and focused review/preview tasks are supported, while dense code editing is intentionally presented as a focused, full-screen surface.

## 10. Data Flow

### Initial generation flow

```text
Wireframe upload + voice/text brief
        ↓
Client validation and user confirmation
        ↓
POST /api/generate (validated, normalized multimodal input)
        ↓
Server AI orchestration and structured artifact validation
        ↓
Immutable version created in project repository
        ↓
Validated artifact returned to client store
        ↓
Sandboxed live preview + CodeMirror buffers + section map render
```

### Refinement flow

```text
Text or final voice transcript
        ↓
Client submits instruction with base version ID and active context
        ↓
Server creates a structured artifact delta
        ↓
Validation, preview-safety checks, and version creation
        ↓
Client applies version, highlights changed files/sections, refreshes preview
        ↓
History timeline and design explanation receive the new provenance
```

### Review and export flows

- Design Review consumes a versioned artifact snapshot, never unsaved editor text without clearly labeling it as draft analysis. Findings are stored or cached against that exact version ID.
- Export first assembles the current artifact into a portable document, runs deterministic validation, then returns a client-downloadable payload. If a validation problem exists, the user sees a readiness issue rather than receiving a silently broken file.

## 11. Deployment Strategy

### Environments

| Environment | Purpose | Deployment policy |
| --- | --- | --- |
| Local | Feature development and manual testing | Local environment variables; mocked AI responses available for repeatable tests |
| Preview | Per-pull-request review and stakeholder demos | Vercel preview deployments; isolated configuration; telemetry tagged as preview |
| Production | User-facing product | Vercel production deployment from protected main branch |

### Delivery approach

- Deploy Next.js on Vercel, using Route Handlers for server-side AI orchestration.
- Store secrets exclusively in Vercel environment variables, scoped by environment and never prefixed for browser exposure.
- Begin with repository-local/browser persistence for the hackathon MVP only if time demands it; use a storage interface from day one so a managed database and object storage can be introduced safely.
- Add a managed relational database and object storage before enabling accounts, shared links, or durable public projects.
- Configure a custom domain, HTTPS, security headers, request rate limits, and error monitoring before external launch.
- Use preview URLs as the primary judge-review environment and publish a short seeded demo path that does not depend on live microphone input.

## 12. Testing Strategy

Testing must protect the product’s most valuable loop: intent in → valid responsive artifact → controlled refinement → portable export.

| Test layer | Scope | Examples |
| --- | --- | --- |
| Unit | Pure transformations and contracts | prompt input assembly, artifact validation, export assembly, version ordering, score normalization |
| Component | Interactive UI behavior | upload validation, transcript controls, device switcher, modal focus trap, code dirty state |
| Integration | Client/server behavior with mocked AI | generation lifecycle, refinement creates version, restore preserves history, review error recovery |
| End-to-end | Critical user paths in a real browser | upload to generation, voice fallback, preview switching, edit-save, review, theme transform, export download |
| Accessibility | Automated and manual assistive tech checks | axe scans, keyboard-only route, screen-reader labels, focus order, contrast verification |
| Visual regression | Design stability on important surfaces | landing hero, setup, desktop workspace, review drawer, mobile studio shell |
| Security / resilience | Boundary behavior | malformed model output, unsafe preview markup, invalid upload, rate limits, unauthorized project access |

AI results are inherently variable, so tests should assert the schema, safety invariants, responsive renderability, and user-visible workflow—not brittle prose or exact generated layouts. Include deterministic fixture artifacts for fast and reliable CI.

## 13. Accessibility Strategy

- Target WCAG 2.2 AA for the Studio and generated default templates; treat violations as release blockers for critical flows.
- Use semantic landmarks, real buttons and inputs, meaningful headings, and form labels rather than div-based controls.
- Ensure full keyboard access to all panes, editor controls, command palette, dialogs, menus, and timeline actions.
- Implement visible high-contrast focus indicators that are never suppressed by glass effects.
- Maintain text and essential icon contrast at AA thresholds; do not rely on color alone for status or severity.
- Make drag-and-drop upload optional by providing a standard file picker and keyboard-operable replacement/removal controls.
- Announce generation progress, transcript state, save state, errors, and export readiness through polite live regions without excessive chatter.
- Respect `prefers-reduced-motion`; transitions become instant or minimal while preserving state clarity.
- Give every preview mode a clear accessible name and never trap focus inside the iframe.
- Include accessibility-focused instructions in generation prompts and review checks, then validate output with deterministic heuristics where possible.

## 14. Performance Optimizations

- Keep the marketing and initial setup path server-rendered and lean; defer heavy studio-only modules.
- Dynamically load CodeMirror, syntax extensions, visual diff, and nonessential review visualizations only after the workspace needs them.
- Compress uploaded wireframes client-side within a defined quality and dimension budget before transfer; reject needlessly huge files early.
- Debounce code-to-preview updates while maintaining a short perceived latency target; avoid rerendering the entire workspace for each keystroke.
- Use an isolated iframe so preview DOM churn does not affect the studio React tree.
- Virtualize long version and conversation histories.
- Memoize selectors and use narrow subscriptions for workspace panes.
- Stream or expose staged progress for longer AI requests where the serving stack supports it; avoid blank loading periods.
- Cache review results, explanations, and export validation by immutable version ID.
- Set payload budgets, image limits, request timeouts, and cancellation behavior for each AI route.
- Measure Core Web Vitals on the public experience and interaction latency within the studio separately.

## 15. Security Considerations

- Keep OpenAI credentials server-only; proxy all model calls through authenticated route handlers.
- Validate every request and every model response with strict schemas; model output is untrusted input.
- Render generated sites only in a sandboxed iframe with a restrictive Content Security Policy and no privileged parent access.
- Sanitize or prohibit active content patterns that are not necessary for the MVP, including unsafe script and network behavior in previews and exports.
- Validate upload size, MIME type, file signature, dimensions, and image decoding; do not trust the file extension.
- Apply request rate limits, payload limits, idempotency where appropriate, and abuse monitoring to AI endpoints.
- Enforce project ownership server-side once identities exist; do not rely on route obscurity.
- Avoid storing voice audio by default. Keep only user-approved transcript/project content, provide deletion capability with durable storage, and document retention behavior.
- Redact sensitive values from logs; log request IDs and bounded metadata rather than full prompts, source code, or uploads.
- Define security headers including CSP, frame controls for the Studio, referrer policy, and permissions policy. The preview iframe has its own tighter policy.
- Review third-party dependencies and pin/update them through a documented vulnerability response process.

## 16. Development Milestones

| Milestone | Scope | Demonstrable outcome |
| --- | --- | --- |
| M0 — Foundations | Repository setup, TypeScript conventions, tokens, linting, test harness, route shell, design system primitives | Premium dark application shell with quality baseline |
| M1 — Intent capture | Project setup, wireframe upload, text brief, Web Speech capture/fallback, input validation | A user can reliably capture and edit multimodal intent |
| M2 — Generation loop | Server-side OpenAI orchestration, structured artifact validation, preview runtime, editable CodeMirror workspace | A wireframe/brief becomes a responsive, editable live site |
| M3 — Refinement & versions | Conversational text/voice refinement, change summaries, immutable version timeline, restore | Users can iterate confidently without losing work |
| M4 — Differentiators | Design Review, Theme Transformer, Explain My Design, responsive preview polish | The experience distinguishes itself beyond baseline generation |
| M5 — Export & hardening | Portable HTML export, error states, accessibility, performance, security hardening | Judge-ready end-to-end experience that is reliable under pressure |
| M6 — Launch readiness | Preview deployment, demo project, smoke tests, observability, documentation | Credible live product demo and handoff package |

## 17. Risks and Mitigation

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Inconsistent model output | Broken previews or weak first result | Strict artifact schema, bounded repair pass, deterministic starter templates, and clear retry controls |
| Model output executes unsafe content | Security and trust risk | Sandboxed iframe, allowlist/minimal active code policy, sanitization, CSP, and output validation |
| Speech recognition is unavailable or unreliable | Voice feature appears broken | Browser capability detection, visible text fallback, editable live transcript, and demo path that works without speech |
| Scope overload before hackathon deadline | Polished core loop is compromised | Build M1–M3 first; use premium features as focused drawers rather than standalone subsystems; feature-flag stretch work |
| Preview/editor synchronization bugs | User loses confidence | Single current-artifact source of truth, debounced buffer model, dirty indicators, explicit save/version policy |
| Responsive generated code is superficially good | Fails at phone/tablet | Generation constraints, fixed breakpoint validation, device previews, and review score tied to actual rendered checks |
| Cost or latency spikes | Slow, expensive demo | Input/output limits, request timeouts, caching by version ID, model selection by task, and request telemetry |
| Visual ambition harms usability | “Premium” becomes hard to read | Restrained glass usage, contrast testing, performance budgets, and reduced-motion support |
| External service outage during demo | End-to-end flow fails | Seeded artifact/demo project, mocked service mode for local rehearsals, and graceful partial-result messaging |

## 18. Time Estimate

Assuming one experienced full-stack engineer/designer working full-time, with a focused MVP that includes all required features and the stated differentiators:

| Phase | Estimate | Notes |
| --- | --- | --- |
| Product design and architecture finalization | 0.5–1 day | User flows, contracts, visual direction, constraints |
| Foundations and premium UI system | 1–1.5 days | Shell, tokens, component primitives, quality tooling |
| Multimodal setup and generation loop | 1.5–2 days | Upload, speech fallback, AI route, preview, editor |
| Refinement, versions, and responsive preview | 1–1.5 days | Core iterative workflow |
| Review, themes, explainability, export | 1.5–2 days | Differentiator depth and portability |
| Hardening, tests, demo polish, deployment | 1–1.5 days | Reliability, accessibility, rehearsal |
| **Total** | **7–9 working days** | A strong hackathon build; 3–4 days requires prioritizing M1–M3 and a lean differentiator presentation |

For a production launch with authentication, durable storage, billing, sharing, collaboration, observability, security review, and broader browser/device QA, plan an additional 4–8 weeks for a small product team.

## 19. Suggested Git Commits

Each commit should be cohesive, reviewable, and pass relevant checks.

1. `chore: initialize Next.js studio foundation and quality tooling`
2. `docs: add SketchSpeak product and engineering plan`
3. `feat: establish premium app shell and design token system`
4. `feat: add multimodal project setup with wireframe and voice capture`
5. `feat: add validated AI website generation pipeline`
6. `feat: add sandboxed live preview and CodeMirror workspace`
7. `feat: add conversational text and voice refinement workflow`
8. `feat: add immutable version history and restore flow`
9. `feat: add responsive preview device modes`
10. `feat: add AI design review scorecard and recommendations`
11. `feat: add theme transformer and design explanations`
12. `feat: add portable HTML export with readiness validation`
13. `test: cover critical generation refinement and export journeys`
14. `fix: harden preview isolation validation and error recovery`
15. `chore: configure Vercel deployment and demo project`

## 20. Acceptance Criteria

### Required feature acceptance

- A user can upload a valid wireframe image, see it before submission, remove/replace it, and receive clear errors for unsupported or oversized files.
- A user can dictate a description in supported browsers, observe a live transcript, edit the final text, and use a text-only fallback when speech recognition is unavailable.
- A valid multimodal or text-only brief generates a complete website artifact with semantic structure, working responsive styles, and visible progress/error states.
- The generated site renders safely in a live preview without leaking access to the Studio application.
- A user can edit the generated source in an accessible code editor and see changes reflected in the preview without losing uncommitted work.
- A text or voice refinement produces a new generated result, a clear change summary, and a new restorable version.
- Phone, tablet, and desktop preview controls render distinct, correctly labeled viewport modes.
- Export produces a standalone HTML file that opens locally and retains its primary visual design and interactions without access to SketchSpeak.

### Differentiator acceptance

- Design Review presents an overall score plus Accessibility, Visual Hierarchy, Spacing, Typography, Color Harmony, and Responsiveness categories; each finding includes a plain-language recommendation.
- Each listed theme preset can be previewed/applied to the current artifact without erasing the site’s core content, and applying it creates a version.
- Version History identifies generation/refinement/theme/manual-save/restore origins, supports viewing prior snapshots, and restores without deleting history.
- Explain My Design provides clear reasoning for each major generated section and relates it to the original intent and responsive behavior.

### Quality acceptance

- The first-run experience is visually coherent, dark, modern, premium, and free from generic placeholder UI or broken layout states at common desktop widths.
- The Studio is keyboard-operable for the critical path; focus is visible; dialogs trap and restore focus correctly; major surfaces meet WCAG 2.2 AA contrast expectations.
- Generated/untrusted content is validated and sandboxed; no API secret is exposed to the browser; upload and route payloads are bounded and validated.
- Core workflows have automated coverage with deterministic AI fixtures, and the end-to-end demo has been rehearsed in the target browser.
- Preview deployment is live, environment variables are correctly scoped, and a seeded demo project demonstrates the full story even if speech recognition is unavailable.

---

## Approval Gate

No application implementation should begin until this plan is approved. On approval, development should start with **M0 — Foundations**, preserving the architecture and quality constraints documented above.

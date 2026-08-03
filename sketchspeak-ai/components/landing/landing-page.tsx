"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  Check,
  ChevronRight,
  FileDown,
  Layers3,
  MousePointer2,
  ScanLine,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { UploadZone } from "@/components/ui/upload-zone";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: ScanLine,
    title: "See the signal in every sketch",
    description: "Turn rough wireframes into a clear page structure while preserving the intent behind every line.",
    accent: "violet",
  },
  {
    icon: AudioLines,
    title: "Design in your own words",
    description: "Talk through the feeling, audience, and details. Your ideas become a precise creative brief.",
    accent: "cyan",
  },
  {
    icon: Layers3,
    title: "Refine with confidence",
    description: "Review every version, test every breakpoint, and evolve a site without losing the work you love.",
    accent: "pink",
  },
];

const workflow = [
  { number: "01", label: "Capture", detail: "Sketch, speak, or start with a thought.", icon: MousePointer2 },
  { number: "02", label: "Compose", detail: "Shape a responsive experience with intent.", icon: WandSparkles },
  { number: "03", label: "Ship", detail: "Inspect the details and take the code anywhere.", icon: FileDown },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow__dot" aria-hidden="true" />
      {children}
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="hero-product" aria-label="Illustration of the SketchSpeak Studio workspace">
      <div className="hero-product__bar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="hero-product__file">
          <span className="file-mark" aria-hidden="true" />
          Acme launch page
        </div>
        <Badge tone="success">Synced</Badge>
      </div>
      <div className="hero-product__body">
        <aside className="hero-product__rail" aria-hidden="true">
          <span className="rail-mark rail-mark--active" />
          <span className="rail-mark" />
          <span className="rail-mark" />
          <span className="rail-mark" />
          <span className="rail-spacer" />
          <span className="rail-avatar">AK</span>
        </aside>
        <div className="hero-product__canvas">
          <div className="hero-product__canvas-top">
            <span>Live preview</span>
            <div className="preview-devices" aria-hidden="true">
              <i className="device-dot device-dot--active" />
              <i className="device-dot" />
              <i className="device-dot" />
            </div>
          </div>
          <div className="site-preview">
            <div className="site-preview__nav">
              <span className="site-preview__logo">CALM.</span>
              <div>
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="site-preview__hero">
              <span>THE NEW STANDARD</span>
              <strong>Tools for a more thoughtful day.</strong>
              <p>A quiet system for work that matters.</p>
              <b>Explore the collection <ArrowRight size={10} /></b>
            </div>
            <div className="site-preview__cards" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="hero-product__prompt">
            <span className="prompt-sparkle" aria-hidden="true"><Sparkles size={13} /></span>
            <span>Make the hero feel more editorial and calm...</span>
            <kbd>↵</kbd>
          </div>
        </div>
      </div>
      <div className="hero-product__review">
        <span className="review-orb" aria-hidden="true"><Check size={12} /></span>
        <div><b>Design review ready</b><span>Strong visual hierarchy</span></div>
        <ChevronRight size={15} aria-hidden="true" />
      </div>
    </div>
  );
}

export function LandingPage() {
  const shouldReduceMotion = useReducedMotion();
  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.72, delay, ease },
  });

  return (
    <main className="marketing-page">
      <div className="ambient ambient--one" aria-hidden="true" />
      <div className="ambient ambient--two" aria-hidden="true" />
      <nav className="marketing-nav container" aria-label="Primary navigation">
        <Logo />
        <div className="marketing-nav__links">
          <a href="#how-it-works">How it works</a>
          <a href="#craft">Craft</a>
          <a href="#workflow">Workflow</a>
        </div>
        <div className="marketing-nav__actions">
          <Link className="text-link" href="/studio">Open Studio</Link>
          <Button asChild size="sm">
            <Link href="/studio">Start designing <ArrowRight size={14} aria-hidden="true" /></Link>
          </Button>
        </div>
      </nav>

      <section className="hero container">
        <motion.div className="hero__copy" {...enter(0.05)}>
          <Badge tone="brand" className="hero__badge"><Sparkles size={13} aria-hidden="true" /> The creative studio for the AI era</Badge>
          <h1>From a rough idea to a <em>real website.</em></h1>
          <p className="hero__lede">SketchSpeak helps you turn a sketch, a thought, or a voice note into a beautifully considered web experience.</p>
          <div className="hero__actions">
            <Button asChild size="lg">
              <Link href="/studio">Open the Studio <ArrowRight size={16} aria-hidden="true" /></Link>
            </Button>
            <a className="quiet-action" href="#how-it-works">See how it works <ChevronRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="hero__proof" aria-label="Product benefits">
            <span><Check size={14} aria-hidden="true" /> Responsive by default</span>
            <span><Check size={14} aria-hidden="true" /> Code you can keep</span>
          </div>
        </motion.div>
        <motion.div className="hero__visual" {...enter(0.16)}>
          <div className="hero-glow" aria-hidden="true" />
          <ProductPreview />
        </motion.div>
      </section>

      <section className="trust-row container" aria-label="Product capabilities">
        <span>Made for the moments between concept and conviction.</span>
        <div className="trust-row__labels"><b>THINK</b><b>MAKE</b><b>REFINE</b><b>SHIP</b></div>
      </section>

      <section id="how-it-works" className="section container narrative-section">
        <div className="section-heading">
          <SectionEyebrow>A more natural creative loop</SectionEyebrow>
          <h2>Your best ideas don&apos;t start as a perfect prompt.</h2>
          <p>Start in the medium that feels most immediate. Studio gives your intent a polished place to land—and room to grow.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, description, accent }, index) => (
            <motion.article
              className={`feature-card feature-card--${accent}`}
              key={title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: index * 0.08, ease }}
            >
              <span className="feature-card__icon" aria-hidden="true"><Icon size={20} strokeWidth={1.65} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="feature-card__line" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </section>

      <section id="craft" className="section container craft-section">
        <Card tone="glass" className="craft-card">
          <div className="craft-card__content">
            <SectionEyebrow>Creative clarity, built in</SectionEyebrow>
            <h2>Move with instinct. Keep the rigor.</h2>
            <p>Every refinement has a reason, every detail has a home. Review quality, compare versions, and stay in control from first sketch to final file.</p>
            <ul className="check-list">
              <li><Check size={15} aria-hidden="true" /> Thoughtful responsive states</li>
              <li><Check size={15} aria-hidden="true" /> Design review that speaks plainly</li>
              <li><Check size={15} aria-hidden="true" /> A complete, restorable history</li>
            </ul>
            <Button asChild variant="secondary"><Link href="/studio">Explore the workspace <ArrowRight size={15} aria-hidden="true" /></Link></Button>
          </div>
          <div className="craft-card__visual" aria-label="Design quality review illustration">
            <div className="review-board">
              <div className="review-board__header"><span>Design review</span><Badge tone="success">92 / 100</Badge></div>
              <div className="score-orbit"><strong>92</strong><span>Excellent</span></div>
              <div className="score-row"><span>Hierarchy</span><i><b style={{ width: "92%" }} /></i><em>92</em></div>
              <div className="score-row"><span>Accessibility</span><i><b style={{ width: "96%" }} /></i><em>96</em></div>
              <div className="score-row"><span>Typography</span><i><b style={{ width: "88%" }} /></i><em>88</em></div>
              <div className="review-board__tip"><Sparkles size={14} aria-hidden="true" /> Strong visual rhythm across every breakpoint.</div>
            </div>
          </div>
        </Card>
      </section>

      <section id="workflow" className="section container workflow-section">
        <div className="section-heading section-heading--center">
          <SectionEyebrow>A studio that follows your thinking</SectionEyebrow>
          <h2>One uninterrupted path from idea to interface.</h2>
        </div>
        <div className="workflow-grid">
          {workflow.map(({ number, label, detail, icon: Icon }, index) => (
            <article className="workflow-step" key={number}>
              <span className="workflow-step__number">{number}</span>
              <span className="workflow-step__icon" aria-hidden="true"><Icon size={19} strokeWidth={1.6} /></span>
              <h3>{label}</h3>
              <p>{detail}</p>
              {index < workflow.length - 1 ? <span className="workflow-step__connector" aria-hidden="true"><ArrowRight size={16} /></span> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="container closing-section">
        <Card tone="glass" className="closing-card">
          <div className="closing-card__orb closing-card__orb--left" aria-hidden="true" />
          <div className="closing-card__orb closing-card__orb--right" aria-hidden="true" />
          <div className="closing-card__copy">
            <Badge tone="brand"><Sparkles size={13} aria-hidden="true" /> SketchSpeak AI Studio</Badge>
            <h2>Make the first version feel like it matters.</h2>
            <p>Bring the thought. We&apos;ll help you make it tangible.</p>
            <Button asChild size="lg"><Link href="/studio">Enter the Studio <ArrowRight size={16} aria-hidden="true" /></Link></Button>
          </div>
          <div className="closing-card__input"><UploadZone compact /></div>
        </Card>
      </section>

      <footer className="marketing-footer container">
        <Logo />
        <p>© 2026 SketchSpeak AI Studio. Design. Talk. Build.</p>
        <Link href="/studio">Studio <ArrowRight size={13} aria-hidden="true" /></Link>
      </footer>
    </main>
  );
}

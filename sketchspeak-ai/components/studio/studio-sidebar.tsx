"use client";

import Link from "next/link";
import {
  Boxes,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  FileCode2,
  FolderOpen,
  LayoutPanelTop,
  MessageSquareText,
  Plus,
  Settings2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const projectItems = [
  { icon: LayoutPanelTop, label: "Overview", active: true },
  { icon: FileCode2, label: "Pages" },
  { icon: MessageSquareText, label: "Refinements" },
  { icon: Clock3, label: "Versions" },
];

export function StudioSidebar() {
  return (
    <aside className="studio-sidebar">
      <div className="studio-sidebar__top">
        <Logo compact />
        <Button variant="quiet" size="icon" aria-label="Switch workspace">
          <ChevronDown size={16} aria-hidden="true" />
        </Button>
      </div>
      <div className="workspace-picker">
        <span className="workspace-picker__avatar">S</span>
        <span><b>SketchSpeak</b><small>Personal workspace</small></span>
        <ChevronDown size={14} aria-hidden="true" />
      </div>
      <Button variant="secondary" className="new-project-button">
        <Plus size={16} aria-hidden="true" /> New project
        <kbd>N</kbd>
      </Button>
      <nav className="studio-sidebar__nav" aria-label="Studio navigation">
        <span className="sidebar-label">Project</span>
        {projectItems.map(({ icon: Icon, label, active }) => (
          <button className={`side-nav-item${active ? " side-nav-item--active" : ""}`} type="button" key={label} aria-current={active ? "page" : undefined}>
            <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
            {label}
          </button>
        ))}
        <span className="sidebar-label sidebar-label--spaced">Workspace</span>
        <button className="side-nav-item" type="button"><FolderOpen size={16} strokeWidth={1.7} aria-hidden="true" /> All projects</button>
        <button className="side-nav-item" type="button"><Boxes size={16} strokeWidth={1.7} aria-hidden="true" /> Design systems</button>
      </nav>
      <div className="studio-sidebar__bottom">
        <div className="sidebar-tip"><Sparkles size={15} aria-hidden="true" /><span><b>Studio foundations</b><small>Beautiful by default.</small></span></div>
        <button className="side-nav-item" type="button"><CircleHelp size={16} strokeWidth={1.7} aria-hidden="true" /> Help center</button>
        <button className="side-nav-item" type="button"><Settings2 size={16} strokeWidth={1.7} aria-hidden="true" /> Settings</button>
        <div className="sidebar-user">
          <span className="sidebar-user__avatar">AK</span>
          <span><b>Arjun Kumar</b><small>Free workspace</small></span>
          <button type="button" aria-label="Open account menu"><Command size={14} aria-hidden="true" /></button>
        </div>
      </div>
      <Link className="studio-sidebar__mobile-home" href="/">Back to home</Link>
    </aside>
  );
}

"use client";

import { Bell, ChevronDown, Cloud, Download, MoreHorizontal, PanelLeft, Search, Share2, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function StudioTopbar() {
  return (
    <header className="studio-topbar">
      <div className="studio-topbar__project">
        <Button className="sidebar-toggle" variant="quiet" size="icon" aria-label="Toggle sidebar"><PanelLeft size={17} aria-hidden="true" /></Button>
        <div className="project-breadcrumb"><span>Projects</span><i>/</i><b>Untitled concept</b><ChevronDown size={14} aria-hidden="true" /></div>
        <Badge tone="warning" className="foundation-badge"><Sparkles size={12} aria-hidden="true" /> Foundation view</Badge>
      </div>
      <div className="studio-topbar__actions">
        <div className="save-status"><Cloud size={14} aria-hidden="true" /> All changes saved</div>
        <Button variant="quiet" size="icon" aria-label="Search projects"><Search size={17} aria-hidden="true" /></Button>
        <Button variant="quiet" size="icon" aria-label="Notifications"><Bell size={17} aria-hidden="true" /></Button>
        <Button variant="secondary" size="sm"><Share2 size={14} aria-hidden="true" /> Share</Button>
        <Button size="sm"><Download size={14} aria-hidden="true" /> Export</Button>
        <Button variant="quiet" size="icon" aria-label="More project actions"><MoreHorizontal size={18} aria-hidden="true" /></Button>
      </div>
    </header>
  );
}

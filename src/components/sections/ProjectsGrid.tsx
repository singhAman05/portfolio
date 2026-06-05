"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Project } from "@/lib/content";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2">
        <button
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
            selectedTag === null
              ? "border-primary/40 bg-primary/16 text-primary"
              : "border-border/70 bg-background/50 text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>
        {allTags.map((tag) => {
          const active = selectedTag === tag;

          return (
            <button
              key={tag}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                active
                  ? "border-primary/40 bg-primary/16 text-primary"
                  : "border-border/70 bg-background/50 text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setSelectedTag(active ? null : tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: i * 0.05 }}
            layout
          >
            <Card className="h-full border-border/75 bg-card/70">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline">{String(i + 1).padStart(2, "0")}</Badge>
                  {project.featured ? <Badge>Featured</Badge> : null}
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-1">
                  {project.highlights.slice(0, 4).map((h, j) => (
                    <li key={j} className="text-sm text-muted-foreground">
                      <span className="mr-2 text-chart-1">●</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 pt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                      Code
                    </Link>
                  </Button>
                  {project.live && (
                    <Button asChild size="sm">
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

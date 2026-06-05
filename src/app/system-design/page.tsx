import { getSystemDesigns } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design | Aman Shankar Singh",
  description: "System design projects exploring architecture decisions, trade-offs, and scalable solutions.",
};

export default function SystemDesignPage() {
  const designs = getSystemDesigns();

  return (
    <section className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl section-shell">
        <div className="mb-12">
          <h1 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            System Design
          </h1>
          <h2 className="mb-3 font-heading text-3xl tracking-tight sm:text-4xl">
            Architecture & Design
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Real implementations of classic system design problems — not just diagrams, but working code with documented decisions.
          </p>
        </div>

        <div className="grid gap-8">
          {designs.map((design) => (
            <Card key={design.id} className="border-border/75 bg-card/70">
              <CardHeader>
                <CardTitle className="text-2xl">{design.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {design.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-1.5">
                  {design.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Architecture Components
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {design.architecture.components.map((comp) => (
                        <Badge key={comp} variant="outline">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {design.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          <span className="mr-2 text-chart-2">●</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Design Decisions
                  </h4>
                  <ul className="space-y-1.5">
                    {design.architecture.decisions.map((d, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        <span className="mr-2 text-chart-4">→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button asChild variant="outline">
                    <Link
                      href={design.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      Source Code
                    </Link>
                  </Button>
                  {design.live && (
                    <Button asChild>
                      <Link
                        href={design.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

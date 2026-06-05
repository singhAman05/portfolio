"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SystemDesign } from "@/lib/content";

interface SystemDesignSpotlightProps {
  designs: SystemDesign[];
}

export function SystemDesignSpotlight({ designs }: SystemDesignSpotlightProps) {
  return (
    <section id="system-design" className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.45 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              System Design
            </p>
            <h3 className="font-heading text-3xl tracking-tight sm:text-4xl">Architecture Spotlight</h3>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/system-design">
              Open Full Library
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {designs.map((design, i) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Card className="h-full border-border/75 bg-card/70">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline">{String(i + 1).padStart(2, "0")}</Badge>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Case Study</span>
                  </div>
                  <CardTitle className="text-2xl">{design.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {design.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {design.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Architecture Components
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {design.architecture.components.map((comp) => (
                        <Badge key={comp} variant="outline" className="text-xs">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Key Decisions
                    </p>
                    <ul className="space-y-1">
                      {design.architecture.decisions.slice(0, 2).map((d, j) => (
                        <li key={j} className="text-sm text-muted-foreground">
                          <span className="mr-2 text-chart-2">●</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={design.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                        Code
                      </Link>
                    </Button>
                    {design.live && (
                      <Button asChild size="sm">
                        <Link
                          href={design.live}
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
    </section>
  );
}

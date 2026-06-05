import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogSeries } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Road to LLD | Blog | Aman Shankar Singh",
  description:
    "A structured learning path through OOP, design principles, concurrency, and exercises.",
};

const seriesIcons: Record<string, string> = {
  "oop-fundamentals": "🧠",
  "design-principles": "🏗️",
  "concurrency-multithreading": "⚡",
  exercises: "💻",
};

export default function RoadToLLDPage() {
  const series = getBlogSeries();

  return (
    <section className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-5xl section-shell">
        <div className="mb-10 flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="shrink-0">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Blog / Series
            </h1>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Road to LLD
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Follow this structured path from OOP basics through design principles to concurrency mastery.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {series.map((s) => (
            <Card key={s.slug} className="flex flex-col border-border/75 bg-card/70 transition-all hover:-translate-y-0.5">
              <CardHeader className="flex-1 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-2xl">{seriesIcons[s.slug] || "📚"}</span>
                  <Badge variant="outline" className="text-xs">
                    {s.posts.length} {s.posts.length === 1 ? "article" : "articles"}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{s.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {Array.from(new Set(s.posts.flatMap((p) => p.tags)))
                    .slice(0, 4)
                    .join(", ")}
                </CardDescription>

                <div className="mt-4 max-h-[220px] space-y-1.5 overflow-y-auto pr-1 scrollbar-thin">
                  {s.posts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/40 px-3 py-2 transition-all hover:border-primary/30 hover:bg-background/70"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground line-clamp-1">
                          {post.title}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}m
                        <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </Link>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

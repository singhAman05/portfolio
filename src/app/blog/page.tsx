import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { getBlogSeries } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Aman Shankar Singh",
  description:
    "Technical articles on OOP, system design, SOLID principles, concurrency, and engineering best practices.",
};

const seriesIcons: Record<string, string> = {
  "oop-fundamentals": "🧠",
  "design-principles": "🏗️",
  "concurrency--multithreading": "⚡",
  exercises: "💻",
};

export default function BlogPage() {
  const series = getBlogSeries();

  return (
    <section className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-5xl section-shell">
        <div className="mb-12">
          <h1 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Blog
          </h1>
          <h2 className="mb-3 font-heading text-3xl tracking-tight sm:text-4xl">
            Engineering Knowledge Base
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Deep dives into object-oriented design, SOLID principles, concurrency patterns, and
            system design — synced from my Obsidian vault.
          </p>
        </div>

        {series.length === 0 ? (
          <div className="rounded-3xl border border-border/70 bg-card/55 p-12 text-center">
            <p className="text-lg font-heading tracking-tight">Content syncing soon</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Blog posts are being synced from source repositories. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {series.map((s) => (
              <Card key={s.slug} className="border-border/75 bg-card/70 transition-all hover:-translate-y-0.5">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl">{seriesIcons[s.slug] || "📚"}</span>
                    <Badge variant="outline" className="text-xs">
                      {s.posts.length} {s.posts.length === 1 ? "article" : "articles"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{s.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {s.posts.length} articles covering{" "}
                    {Array.from(new Set(s.posts.flatMap((p) => p.tags)))
                      .slice(0, 4)
                      .join(", ")}
                  </CardDescription>

                  <div className="mt-4 space-y-1.5">
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
                          <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground">
                            {post.title}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
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
        )}

        <div className="mt-12 rounded-2xl border border-border/60 bg-background/40 p-4 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            Content auto-synced from{" "}
            <Link
              href="https://github.com/singhAman05/LLD-System_Design"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              LLD-System_Design
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

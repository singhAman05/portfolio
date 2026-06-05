import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Route } from "lucide-react";
import { getBlogSeries } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Aman Shankar Singh",
  description:
    "Technical articles on OOP, system design, SOLID principles, concurrency, and engineering best practices.",
};

export default function BlogPage() {
  const series = getBlogSeries();
  const totalPosts = series.reduce((acc, s) => acc + s.posts.length, 0);

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
            system design — synced from my study notes.
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
          <div className="grid gap-6">
            <Link href="/blog/road-to-lld" className="group">
              <Card className="relative overflow-hidden border-border/75 bg-gradient-to-br from-primary/5 via-card/70 to-card/90 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="flex flex-row items-start gap-6 p-8">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary shadow-sm">
                    <Route className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <CardTitle className="text-2xl font-heading tracking-tight">
                        Road to LLD
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {totalPosts} articles
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed max-w-xl">
                      A structured learning path covering OOP fundamentals, SOLID &amp; design principles,
                      concurrency patterns, and hands-on exercises — from basics to production-level design.
                    </CardDescription>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {series.map((s) => (
                        <Badge key={s.slug} variant="secondary" className="text-xs">
                          {s.name} ({s.posts.length})
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Explore series
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
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

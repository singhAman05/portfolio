import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getAllBlogSlugs,
  getBlogSeries,
  renderMarkdown,
  extractHeadings,
} from "@/lib/blog";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };

  const plainText = post.content
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return {
    title: `${post.title} | Aman Shankar Singh`,
    description: plainText.slice(0, 160),
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);
  const headings = extractHeadings(post.content);

  // Find series context for prev/next navigation
  const allSeries = getBlogSeries();
  const currentSeries = allSeries.find((s) => s.slug === post.seriesSlug);
  let prevPost = null;
  let nextPost = null;

  if (currentSeries) {
    const currentIndex = currentSeries.posts.findIndex((p) => p.slug === post.slug);
    if (currentIndex > 0) prevPost = currentSeries.posts[currentIndex - 1];
    if (currentIndex < currentSeries.posts.length - 1)
      nextPost = currentSeries.posts[currentIndex + 1];
  }

  return (
    <article className="px-4 pb-8 sm:px-6 sm:pb-10">
      <div className="mx-auto max-w-6xl section-shell">
        {/* Back nav */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-10">
          {currentSeries && (
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {currentSeries.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Article {post.order} of {currentSeries.posts.length}
              </span>
            </div>
          )}
          <h1 className="font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              {post.sourceRepo}
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Layout: TOC + Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
          {/* Main content */}
          <div
            className="blog-content max-w-none rounded-3xl border border-border/70 bg-card/55 p-6 sm:p-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Table of Contents - sticky sidebar */}
          {headings.length > 2 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  On this page
                </p>
                <nav className="space-y-1 border-l border-border/60 pl-3">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-sm transition-colors hover:text-foreground ${
                        h.level === 3
                          ? "pl-3 text-muted-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Series navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/50 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium">{prevPost.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-border/70 bg-background/50 p-4 text-right transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div>
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-sm font-medium">{nextPost.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

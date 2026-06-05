import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Aman Shankar Singh",
  description: "Technical articles on system design, full-stack development, and engineering best practices.",
};

const posts = [
  {
    slug: "building-url-shortener",
    title: "Building a URL Shortener from Scratch",
    description: "A deep dive into designing and implementing a production URL shortener with Redis caching, Supabase storage, and automatic expiry.",
    date: "2025-02-03",
    tags: ["System Design", "Redis", "TypeScript"],
  },
  {
    slug: "distributed-file-system-architecture",
    title: "Distributed File System Architecture",
    description: "Lessons learned building a distributed file system with load balancing, health monitoring, and fuzzy search across multiple storage nodes.",
    date: "2025-01-17",
    tags: ["Distributed Systems", "Node.js", "MongoDB"],
  },
  {
    slug: "web-crawler-design",
    title: "Designing a Scalable Web Crawler",
    description: "How to build a domain-restricted web crawler with configurable depth, BFS traversal, and real-time job tracking.",
    date: "2025-02-08",
    tags: ["System Design", "TypeScript", "Crawling"],
  },
];

export default function BlogPage() {
  return (
    <section className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-5xl section-shell">
        <div className="mb-12">
          <h1 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Blog
          </h1>
          <h2 className="mb-3 font-heading text-3xl tracking-tight sm:text-4xl">
            Technical Writing
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Deep dives into system design, architecture decisions, and engineering learnings from building real products.
          </p>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="border-border/75 bg-card/70">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{post.date}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; tags: string[]; content: string }> = {
  "building-url-shortener": {
    title: "Building a URL Shortener from Scratch",
    date: "2025-02-03",
    tags: ["System Design", "Redis", "TypeScript"],
    content: `
## The Problem

URL shorteners seem simple on the surface — take a long URL, return a short one. But building one that handles real traffic reveals interesting system design challenges: key generation without collisions, fast redirects, expiry management, and usage tracking.

## Architecture Overview

The system uses a **Next.js frontend** for the user interface and an **Express + TypeScript backend** for the API layer. **Supabase (Postgres)** provides durable storage while **Redis** handles caching for sub-millisecond redirect lookups.

### Key Components:
- **Short Key Generator**: Produces unique keys with collision detection
- **Redis Cache**: First-layer lookup for redirects (cache-aside pattern)
- **Supabase Storage**: Durable store for URL mappings with expiry dates
- **Cron Scheduler**: Batch-flushes Redis usage metrics to Postgres every minute

## Design Decisions

**Why Redis for redirects?** Redirect latency matters. Users click shortened links expecting instant navigation. By caching the most-used mappings in Redis, we serve 95%+ of redirects without touching Postgres.

**Why batch-flush usage data?** Writing every "last_used" timestamp directly to Postgres on each redirect would create write contention. Instead, we accumulate timestamps in Redis and flush them in batch every 60 seconds — trading slight staleness for much better write performance.

**Why custom expiry?** Not all short links need to live forever. Supporting optional \`cust_expiry\` dates lets users create temporary share links that auto-expire, reducing the long-term storage footprint.

## Lessons Learned

1. **Cache invalidation is hard** — but for URL shorteners, it's simpler because mappings rarely change. We only invalidate on explicit deletion.
2. **Redis persistence matters** — if Redis restarts, we lose in-flight usage data. The cron job's 60-second window limits this risk.
3. **Key length is a trade-off** — shorter keys = higher collision probability. We use 7 characters (base62) giving ~3.5 trillion possibilities.
    `,
  },
  "distributed-file-system-architecture": {
    title: "Distributed File System Architecture",
    date: "2025-01-17",
    tags: ["Distributed Systems", "Node.js", "MongoDB"],
    content: `
## Why Build a DFS?

Traditional file storage breaks down when you need: concurrent access from multiple clients, fault tolerance when servers fail, and fast retrieval regardless of file location. Building a distributed file system from scratch taught me how real systems like HDFS and GFS solve these problems.

## System Architecture

The system consists of three layers:

### 1. Client Layer (React Dashboard)
Users interact with a personalized dashboard showing system status, upload/download progress, and file search. The fuzzy search system uses approximate string matching so users don't need exact filenames.

### 2. Coordination Layer (Express API)
The API server handles:
- **File chunking**: Large files are split into chunks for parallel transfer
- **Load balancing**: Chunks are distributed across available storage nodes
- **Health monitoring**: Cron jobs check node status every 30 seconds

### 3. Storage Layer (Multiple Nodes)
Each storage node is an independent server that:
- Stores file chunks locally
- Reports health status on heartbeat requests
- Participates in data redistribution when sibling nodes fail

## Key Design Decisions

**Chunk-based storage over whole-file replication**: Storing entire file copies is simpler but wastes storage. Chunking enables parallel uploads/downloads and more granular load distribution.

**Cron-based health checks over event-driven monitoring**: Simpler to implement, less prone to false positives, and adequate for our scale. Production systems would use a gossip protocol.

**MongoDB for metadata**: Flexible schema works well for file metadata that varies (different file types, user-defined tags, chunk location maps).

## Trade-offs Acknowledged

- **Consistency vs Availability**: We favor availability — reads might return slightly stale data during node failures
- **Complexity vs Performance**: Chunking adds complexity but enables parallel operations
- **Memory vs Reliability**: In-memory chunk maps are fast but require rebuild on coordinator restart
    `,
  },
  "web-crawler-design": {
    title: "Designing a Scalable Web Crawler",
    date: "2025-02-08",
    tags: ["System Design", "TypeScript", "Crawling"],
    content: `
## The Challenge

Web crawling sounds straightforward: fetch a page, extract links, follow them. But at scale, you face politeness constraints, duplicate detection, depth management, and the question of when to stop.

## Architecture

### Frontend (Next.js Dashboard)
A clean interface to:
- Start crawl jobs with a seed URL and max pages limit
- Monitor active jobs with real-time status updates
- View crawl results and extracted page data

### Backend (Express + TypeScript)
The crawl engine:
- **Job Manager**: Tracks crawl jobs with status, timing, and page counts
- **URL Frontier**: BFS queue of URLs to visit (domain-restricted)
- **Fetcher**: Axios-based page retrieval with timeout handling
- **Parser**: Cheerio-based HTML parsing for link extraction

## Design Decisions

**BFS over DFS**: Breadth-first ensures we crawl the most important (closest to root) pages first. DFS could go infinitely deep on a single path before exploring breadth.

**Domain restriction**: The crawler only follows links within the original seed URL's domain. This prevents the crawl from exploding across the entire internet and keeps results focused.

**In-memory job store**: For the current scale, in-memory storage is fast and simple. Each job stores its URL frontier, visited set, and results. The trade-off: all state is lost on server restart.

**Max pages as the stopping condition**: Rather than time-based limits, we cap the number of pages. This gives predictable resource usage and makes the crawl scope clear to users.

## Handling Edge Cases

- **Duplicate URLs**: A visited set (normalized URLs) prevents re-crawling
- **Slow pages**: 10-second timeout per fetch prevents single pages from blocking the crawler
- **Relative URLs**: All extracted links are resolved to absolute URLs before adding to the frontier
- **Non-HTML content**: Content-Type checking skips PDFs, images, etc.

## Future Improvements

1. **Persistent storage**: Redis or Postgres for job state durability
2. **Worker pool**: Distribute crawling across multiple workers for parallelism
3. **Robots.txt compliance**: Respect crawl-delay and disallow rules
4. **Rate limiting**: Per-domain request throttling for politeness
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = posts[slug];
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
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-4xl section-shell">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="mb-12">
          <time className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{post.date}</time>
          <h1 className="mt-2 font-heading text-3xl tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="max-w-none rounded-3xl border border-border/70 bg-card/55 p-5 prose prose-neutral dark:prose-invert">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="mb-4 mt-8 font-heading text-2xl tracking-tight">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="mb-3 mt-6 font-heading text-xl tracking-tight">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- **") || line.startsWith("1. **")) {
              return (
                <li key={i} className="ml-4 text-muted-foreground leading-relaxed">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/^[-\d.]+\s*/, "")
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/`(.*?)`/g, "<code class='bg-muted px-1 py-0.5 rounded text-sm'>$1</code>"),
                    }}
                  />
                </li>
              );
            }
            if (line.trim() === "") return <br key={i} />;
            return (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-2"
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>")
                    .replace(/`(.*?)`/g, "<code class='bg-muted px-1 py-0.5 rounded text-sm'>$1</code>"),
                }}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
}

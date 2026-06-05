import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const blogDir = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  series: string;
  seriesSlug: string;
  order: number;
  tags: string[];
  readingTime: number;
  content: string;
  sourceRepo: string;
  sourceFile: string;
}

export interface SeriesPostEntry {
  slug: string;
  title: string;
  order: number;
  readingTime: number;
  tags: string[];
}

export interface BlogSeries {
  name: string;
  slug: string;
  posts: SeriesPostEntry[];
}

export function getBlogSeries(): BlogSeries[] {
  const indexPath = path.join(blogDir, "index.json");
  if (!fs.existsSync(indexPath)) return [];
  const raw = fs.readFileSync(indexPath, "utf-8");
  return JSON.parse(raw) as BlogSeries[];
}

export function getBlogPost(slug: string): BlogPost | null {
  const postPath = path.join(blogDir, `${slug}.json`);
  if (!fs.existsSync(postPath)) return null;
  const raw = fs.readFileSync(postPath, "utf-8");
  return JSON.parse(raw) as BlogPost;
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => f.replace(".json", ""));
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark-default",
      keepBackground: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

export function extractHeadings(
  content: string
): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[🗂️📄🔑🧠💡🔍🗺️🎯📝🔗]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}

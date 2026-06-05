/**
 * Blog Content Sync Script
 *
 * Reads markdown files from cloned source repositories (_sources/),
 * parses frontmatter, and writes structured JSON to content/blog/.
 *
 * Source repos are cloned into _sources/<repo-name>/ by the GitHub Actions workflow.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SOURCES_DIR = path.join(process.cwd(), "_sources");
const OUTPUT_DIR = path.join(process.cwd(), "content", "blog");

// Mapping of source repos to their config
const REPO_CONFIG = {
  "LLD-System_Design": {
    defaultTags: ["cpp", "oop", "lld"],
    seriesMapping: {
      // root .md files → series name
      ".": "OOP Fundamentals",
      Design_Principles: "Design Principles",
      "Concurrency_&_Multithreading": "Concurrency & Multithreading",
      Exercises: "Exercises",
    },
  },
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractTitle(content, filename) {
  // Try # heading first
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/[🗂️📄🔑🧠💡🔍🗺️🎯📝🔗]/g, "").trim();

  // Try ## heading as fallback
  const h2 = content.match(/^##\s+(.+)$/m);
  if (h2) return h2[1].replace(/[🗂️📄🔑🧠💡🔍🗺️🎯📝🔗]/g, "").trim();

  // Use filename as last resort
  if (filename) {
    return filename
      .replace(/\.md$/, "")
      .replace(/^\d+[-\s]*/, "") // remove leading numbers like "01-"
      .replace(/[_-]/g, " ")
      .trim();
  }

  return "Untitled";
}

function estimateReadingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function convertWikiLinks(content) {
  // Convert [[filename]] → `filename`
  return content.replace(/\[\[([^\]]+)\]\]/g, "`$1`");
}

function extractTagsFromContent(content) {
  const match = content.match(/\*\*Tags?:\*\*\s*(.+)$/m);
  if (match) {
    return match[1]
      .split(/[,\s]+/)
      .filter((t) => t.startsWith("#"))
      .map((t) => t.replace("#", ""));
  }
  return [];
}

function processMarkdownFile(filePath, repoName, seriesName, order) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(raw);

  const filename = path.basename(filePath);
  const title = frontmatter.title || extractTitle(content, filename);
  const series = frontmatter.series || seriesName;
  const tags =
    frontmatter.tags || extractTagsFromContent(content) || REPO_CONFIG[repoName]?.defaultTags || [];
  const slug = slugify(title);

  // Clean content: convert wikilinks, remove tag line at bottom
  let cleanContent = convertWikiLinks(content);
  cleanContent = cleanContent.replace(/\*\*Tags?:\*\*\s*.+$/m, "").trim();

  return {
    slug,
    title,
    series,
    seriesSlug: slugify(series),
    order: frontmatter.order || order,
    tags: Array.isArray(tags) ? tags : [tags],
    readingTime: estimateReadingTime(cleanContent),
    content: cleanContent,
    sourceRepo: repoName,
    sourceFile: path.relative(path.join(SOURCES_DIR, repoName), filePath),
  };
}

function processRepo(repoName) {
  const repoDir = path.join(SOURCES_DIR, repoName);
  if (!fs.existsSync(repoDir)) {
    console.log(`⚠️  Source directory not found: ${repoDir}`);
    return [];
  }

  const config = REPO_CONFIG[repoName];
  if (!config) {
    console.log(`⚠️  No config for repo: ${repoName}`);
    return [];
  }

  const posts = [];

  for (const [dir, seriesName] of Object.entries(config.seriesMapping)) {
    const targetDir = dir === "." ? repoDir : path.join(repoDir, dir);
    if (!fs.existsSync(targetDir)) continue;

    const files = fs
      .readdirSync(targetDir)
      .filter((f) => f.endsWith(".md") && !f.toLowerCase().startsWith("readme"))
      .sort();

    files.forEach((file, index) => {
      const filePath = path.join(targetDir, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        // Skip empty/placeholder files (less than 100 chars of real content)
        if (raw.trim().length < 100) {
          console.log(`  ⊘ Skipped (too short): ${file}`);
          return;
        }
        const post = processMarkdownFile(filePath, repoName, seriesName, index + 1);
        posts.push(post);
        console.log(`  ✓ ${seriesName} / ${post.title}`);
      } catch (err) {
        console.error(`  ✗ Error processing ${file}: ${err.message}`);
      }
    });
  }

  return posts;
}

// Main
console.log("🔄 Syncing blog content...\n");

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const allPosts = [];

for (const repoName of Object.keys(REPO_CONFIG)) {
  console.log(`📦 Processing: ${repoName}`);
  const posts = processRepo(repoName);
  allPosts.push(...posts);
  console.log(`   → ${posts.length} posts\n`);
}

// Group by series for the index
const series = {};
for (const post of allPosts) {
  if (!series[post.seriesSlug]) {
    series[post.seriesSlug] = {
      name: post.series,
      slug: post.seriesSlug,
      posts: [],
    };
  }
  series[post.seriesSlug].posts.push({
    slug: post.slug,
    title: post.title,
    order: post.order,
    readingTime: post.readingTime,
    tags: post.tags,
  });
}

// Sort posts within each series by order
for (const s of Object.values(series)) {
  s.posts.sort((a, b) => a.order - b.order);
}

// Write individual post files
for (const post of allPosts) {
  const postFile = path.join(OUTPUT_DIR, `${post.slug}.json`);
  fs.writeFileSync(postFile, JSON.stringify(post, null, 2));
}

// Write series index
const indexFile = path.join(OUTPUT_DIR, "index.json");
fs.writeFileSync(indexFile, JSON.stringify(Object.values(series), null, 2));

console.log(`✅ Done! ${allPosts.length} posts synced across ${Object.keys(series).length} series.`);

"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  name: string;
  tagline: string;
  github: string;
  linkedin: string;
}

export function Hero({ name, tagline, github, linkedin }: HeroProps) {
  return (
    <section className="px-4 pb-8 sm:px-6 sm:pb-10">
      <div className="mx-auto grid min-h-[70vh] w-full max-w-6xl items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="section-shell noise-overlay flex flex-col justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/45 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Building production-grade full-stack systems
            </div>

            <h1 className="text-4xl font-heading font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="accent-heading">{name}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {tagline}. I design architecture with real trade-offs and ship
              polished interfaces that feel fast, intentional, and human.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {[
                "GitHub-level shipping",
                "StackOverflow clarity",
                "GitLab workflow mindset",
                "YouTube-first storytelling",
              ].map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-border/70 bg-background/45 px-3 py-1"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-teal-400/25 bg-teal-500/8 p-3 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-wide text-teal-600 dark:text-teal-300">Focus</p>
                <p className="mt-1 text-sm font-semibold">System Design + Product UX</p>
              </div>
              <div className="rounded-2xl border border-purple-400/25 bg-purple-500/8 p-3 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-wide text-purple-600 dark:text-purple-300">Stack</p>
                <p className="mt-1 text-sm font-semibold">Next.js, TypeScript, Redis</p>
              </div>
              <div className="rounded-2xl border border-sky-400/25 bg-sky-500/8 p-3 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-wide text-sky-600 dark:text-sky-300">Mode</p>
                <p className="mt-1 text-sm font-semibold">Architecture to deployment</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="glass-strong flex flex-col justify-between rounded-4xl border border-border/75 p-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Now Shipping</p>
            <h2 className="mt-3 font-heading text-2xl tracking-tight">Engineering with Design Discipline</h2>
          </div>

          <div className="mt-8 space-y-4">
            {[
              { text: "Finance workflows with real-time alerts", color: "bg-[oklch(0.84_0.17_171)]" },
              { text: "Distributed and cache-first backend systems", color: "bg-[oklch(0.58_0.2_295)]" },
              { text: "Performance-led interfaces with motion restraint", color: "bg-[oklch(0.7_0.14_220)]" },
            ].map(
              (item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-border/65 bg-background/45 p-3 transition-all duration-300 ease-out hover:bg-background/60">
                  <span className={`mt-1.5 h-2 w-2 rounded-full ${item.color}`} />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              )
            )}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Looking for someone who can think in architecture and execute with pixel-level polish.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}

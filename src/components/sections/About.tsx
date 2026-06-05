"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface AboutProps {
  headline: string;
  bio: string;
  pitch: string;
  differentiators: string[];
}

export function About({ headline, bio, pitch, differentiators }: AboutProps) {
  return (
    <section id="about" className="px-4 pb-8 sm:px-6 sm:pb-10">
      <div className="mx-auto max-w-6xl section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">About</p>
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">{headline}</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="glass rounded-3xl border border-border/70 p-5"
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{bio}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{pitch}</p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/45 px-3 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Design-first engineering, not template-first development
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="space-y-3"
          >
            {differentiators.map((item) => (
              <div
                key={item}
                className="glass rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

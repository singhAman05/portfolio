"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/lib/content";

// Color map for each category — Cyber-Nordic palette with contrasting accents
const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Frontend: {
    bg: "bg-teal-500/12 dark:bg-teal-400/14",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-400/30 dark:border-teal-400/25",
    dot: "bg-teal-400",
  },
  Backend: {
    bg: "bg-purple-500/12 dark:bg-purple-400/14",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-400/30 dark:border-purple-400/25",
    dot: "bg-purple-400",
  },
  "Databases & Caching": {
    bg: "bg-amber-500/12 dark:bg-amber-400/14",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-400/30 dark:border-amber-400/25",
    dot: "bg-amber-400",
  },
  "DevOps & Tools": {
    bg: "bg-sky-500/12 dark:bg-sky-400/14",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-400/30 dark:border-sky-400/25",
    dot: "bg-sky-400",
  },
  Languages: {
    bg: "bg-rose-500/12 dark:bg-rose-400/14",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-400/30 dark:border-rose-400/25",
    dot: "bg-rose-400",
  },
  "System Design": {
    bg: "bg-indigo-500/12 dark:bg-indigo-400/14",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-400/30 dark:border-indigo-400/25",
    dot: "bg-indigo-400",
  },
};

const fallbackColor = {
  bg: "bg-primary/10",
  text: "text-primary",
  border: "border-primary/20",
  dot: "bg-primary",
};

interface SkillsProps {
  categories: SkillCategory[];
}

export function Skills({ categories }: SkillsProps) {
  return (
    <section id="skills" className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Skills
          </h2>
          <h3 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Tech Constellation</h3>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => {
            const colors = categoryColors[category.name] || fallbackColor;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass rounded-2xl border border-border/70 p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {category.name}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.72rem] font-medium tracking-wide transition-all duration-200 ease-out hover:scale-105 ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

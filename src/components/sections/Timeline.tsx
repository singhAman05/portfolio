"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { Experience } from "@/lib/content";
import { cn } from "@/lib/utils";

interface TimelineProps {
  experience: Experience[];
}

export function Timeline({ experience }: TimelineProps) {
  return (
    <section id="experience" className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Experience
          </h2>
          <h3 className="font-heading text-3xl tracking-tight sm:text-4xl">Journey</h3>
        </motion.div>

        <div className="relative space-y-5 before:absolute before:left-[18px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border md:before:left-1/2">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: i * 0.08 }}
              className={`relative flex flex-col gap-4 pl-12 md:flex-row md:pl-0 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-[13px] top-4 h-3 w-3 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />

              <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pl-9" : "md:pr-9 md:text-right"}`}>
                <div className={cn("glass rounded-2xl border border-border/70 p-4", i % 2 !== 0 ? "md:ml-auto" : "")}>
                  <div className={cn("mb-2 flex items-center gap-2", i % 2 !== 0 ? "md:justify-end" : "")}>
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="font-heading text-xl tracking-tight">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                  <ul className={cn("mt-3 space-y-1.5", i % 2 !== 0 ? "md:ml-auto" : "")}>
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-muted-foreground">
                        <span className="mr-2 text-chart-4">●</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

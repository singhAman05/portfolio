import { getProjects } from "@/lib/content";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Aman Shankar Singh",
  description: "Full-stack projects built with modern technologies - from finance trackers to distributed systems.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="px-4 pb-8 sm:px-6 sm:pb-10">
      <div className="mx-auto max-w-6xl section-shell">
        <div className="mb-12">
          <h1 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </h1>
          <h2 className="mb-3 font-heading text-3xl tracking-tight sm:text-4xl">All Projects</h2>
          <p className="max-w-2xl text-muted-foreground">
            A collection of full-stack applications, each built as a real system with production-grade engineering and UX intent.
          </p>
        </div>
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}

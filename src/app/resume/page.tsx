import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Resume | Aman Shankar Singh",
  description: "View and download my resume.",
};

export default function ResumePage() {
  return (
    <section className="px-4 pb-8 sm:px-6 sm:pb-10">
      <div className="mx-auto max-w-5xl section-shell">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Resume
            </h1>
            <h2 className="font-heading text-2xl tracking-tight sm:text-3xl">
              Aman Shankar Singh
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button asChild size="sm">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/50">
          <iframe
            src="/resume.pdf"
            className="h-[85vh] w-full"
            title="Resume"
          />
        </div>
      </div>
    </section>
  );
}

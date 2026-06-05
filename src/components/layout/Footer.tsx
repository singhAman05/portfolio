import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { getSiteConfig } from "@/lib/content";

export function Footer() {
  const site = getSiteConfig();
  const socialLinks = [
    { href: site.github, icon: GithubIcon, label: "GitHub" },
    { href: site.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: site.twitter, icon: XIcon, label: "X" },
    { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
  ];

  const quickLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/system-design", label: "System Design" },
    { href: "/blog", label: "Blog" },
    { href: "/resume", label: "Resume" },
  ];

  return (
    <footer className="px-4 pb-6 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border/70 p-5 sm:p-6 glass">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="font-heading text-lg tracking-tight">Building Fast, Useful, and Thoughtful Software</p>
            <p className="mt-2 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Aman Shankar Singh. Open to product engineering and system design work.
            </p>
            <Link
              href={`mailto:${site.email}`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Let&apos;s connect
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Quick Links</p>
            <div className="grid gap-1.5 text-sm">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Social</p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/65 bg-background/60 p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

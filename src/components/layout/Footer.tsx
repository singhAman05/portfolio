import { Mail } from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

const socialLinks = [
  { href: "https://github.com/singhAman05", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/in/singhaman05", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://twitter.com/singhAman05", icon: XIcon, label: "Twitter" },
  { href: "mailto:amanshankarsingh05@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="px-4 pb-7 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-border/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 glass">
        <div>
          <p className="font-heading text-lg tracking-tight">Let&apos;s Build Something That Ships</p>
          <p className="mt-1 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aman Shankar Singh. Designed with intent.
          </p>
        </div>

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
    </footer>
  );
}

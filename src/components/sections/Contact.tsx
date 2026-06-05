"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xpwdgvqk", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </h2>
          <h3 className="mb-2 font-heading text-3xl tracking-tight sm:text-4xl">Get in Touch</h3>
          <p className="text-muted-foreground">
            Have a project in mind or want to collaborate? Drop me a message.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, delay: 0.05 }}
            className="glass rounded-3xl border border-border/70 p-5"
          >
            <h4 className="font-heading text-xl tracking-tight">Prefer direct contact?</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              I usually respond within 24 hours. For collaborations, include your
              timeline and what success looks like.
            </p>

            <div className="mt-5 space-y-2">
              <Link
                href="mailto:amanshankarsingh05@gmail.com"
                className="flex items-center gap-2 rounded-xl border border-border/65 bg-background/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                amanshankarsingh05@gmail.com
              </Link>
              <Link
                href="https://github.com/singhAman05"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border/65 bg-background/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4 text-primary" />
                github.com/singhAman05
              </Link>
            </div>
          </motion.aside>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl border border-border/70 p-8 text-center"
            >
              <p className="font-heading text-2xl tracking-tight">Thanks for reaching out</p>
              <p className="mt-2 text-sm text-muted-foreground">
                I&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="glass rounded-3xl border border-border/70 p-5 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="name" placeholder="Name" required />
                <Input name="email" type="email" placeholder="Email" required />
              </div>
              <Input name="subject" placeholder="Subject" required />
              <Textarea
                name="message"
                placeholder="Your message..."
                rows={6}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
              {error && (
                <p className="text-center text-sm text-destructive">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

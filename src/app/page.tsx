import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SystemDesignSpotlight } from "@/components/sections/SystemDesignSpotlight";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import {
  getSiteConfig,
  getAboutConfig,
  getFeaturedProjects,
  getSystemDesigns,
  getSkills,
  getExperience,
} from "@/lib/content";

export default function Home() {
  const site = getSiteConfig();
  const about = getAboutConfig();
  const projects = getFeaturedProjects();
  const designs = getSystemDesigns();
  const skills = getSkills();
  const experience = getExperience();

  return (
    <>
      <Hero
        name={site.name}
        tagline={site.tagline}
        github={site.github}
        linkedin={site.linkedin}
      />
      <About
        headline={about.headline}
        bio={about.bio}
        pitch={about.pitch}
        differentiators={about.differentiators}
      />
      <FeaturedProjects projects={projects} />
      <SystemDesignSpotlight designs={designs} />
      <Skills categories={skills.categories} />
      <Timeline experience={experience} />
      <Contact email={site.email} github={site.github} linkedin={site.linkedin} />
    </>
  );
}

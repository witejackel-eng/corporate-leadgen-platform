import { getFeaturedProjects } from "@/server/queries/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/features/projects/project-card";

export async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Engineering showcase"
          title="What's actually running under the hood"
          description="Four subsystems from this platform's own codebase — linked straight to the source, not a marketing brochure."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id ?? project.slug}
              title={project.title}
              category={project.category}
              summary={project.summary}
              coverImage={project.coverImage}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

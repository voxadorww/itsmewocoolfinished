import { motion } from "motion/react";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  robloxLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export function ProjectsSection({ projects, isAdmin, onEdit, onDelete }: ProjectsSectionProps) {
  return (
    <section className="relative py-20 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of Roblox builds and creations
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-xl">No projects yet. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

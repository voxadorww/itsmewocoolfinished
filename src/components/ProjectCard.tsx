import { motion } from "motion/react";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  robloxLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, index, isAdmin, onEdit, onDelete }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-secondary">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
        
        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          {project.robloxLink && (
            <Button
              size="sm"
              variant="default"
              className="gap-2"
              onClick={() => window.open(project.robloxLink, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              View in Roblox
            </Button>
          )}
          
          {isAdmin && (
            <>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit?.(project)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete?.(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-2xl font-bold mb-2 gradient-text"
          whileHover={{ scale: 1.02 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-muted-foreground line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

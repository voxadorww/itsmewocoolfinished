import { motion } from "motion/react";
import { Building2, Sparkles, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  robloxLink?: string;
}

interface HeroProps {
  featuredProjects?: Project[];
}

export function Hero({ featuredProjects = [] }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Hero Content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Roblox Builder & Developer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
          >
            ItsMe_WoCool
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
          >
            Crafting immersive worlds and experiences in Roblox. Professional builds that bring your vision to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            <Building2 className="w-6 h-6 text-primary" />
            <span className="text-base text-foreground/80">Specialized in detailed environments & gameplay systems</span>
          </motion.div>
        </div>

        {/* Right side - Featured Projects Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <div className="relative h-[600px] rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-sm p-4 flex flex-col">
            <div className="mb-4 flex items-center justify-between flex-shrink-0">
              <h3 className="text-xl font-bold text-primary">Featured Works</h3>
              <span className="text-sm text-muted-foreground">{featuredProjects.length} projects</span>
            </div>
            
            {featuredProjects.length > 0 ? (
              <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 space-y-4 custom-scrollbar">
                {featuredProjects.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group relative rounded-xl overflow-hidden border border-primary/20 bg-card hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {project.robloxLink && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary/90 rounded-full p-2">
                            <ExternalLink className="w-4 h-4 text-background" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-foreground mb-1">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
                
                {featuredProjects.length > 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-center py-4"
                  >
                    <p className="text-sm text-primary font-medium">+ {featuredProjects.length - 3} more projects below</p>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-1">
                <p className="text-muted-foreground text-center">
                  Projects coming soon!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
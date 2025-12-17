import { motion } from "motion/react";
import { useState } from "react";
import { Building2, Palette, Code, Lightbulb, Award } from "lucide-react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: Building2,
    title: "About Me",
    content: "Hey! I'm ItsMe_WoCool, a passionate Roblox builder dedicated to creating immersive and visually stunning experiences. With years of experience in building and scripting, I transform ideas into reality. My work focuses on attention to detail, optimized performance, and creative design that pushes the boundaries of what's possible in Roblox.",
  },
  {
    id: "building",
    label: "Building",
    icon: Palette,
    title: "Building & Design",
    content: "I specialize in creating detailed environments, from realistic cityscapes to fantasy worlds. My building style combines modern techniques with artistic vision, utilizing advanced lighting, terrain manipulation, and custom textures. I'm proficient in both Studio tools and external modeling software to deliver professional-grade builds.",
  },
  {
    id: "scripting",
    label: "Scripting",
    icon: Code,
    title: "Scripting & Systems",
    content: "Proficient in Lua scripting for Roblox, I develop complex gameplay systems, UI interactions, and optimization scripts. From creating smooth animations to implementing advanced game mechanics, I ensure every system is efficient, scalable, and bug-free. I also specialize in data management and server-client architecture.",
  },
  {
    id: "creativity",
    label: "Creative Vision",
    icon: Lightbulb,
    title: "Creative Process",
    content: "Every project starts with understanding the vision and goals. I brainstorm concepts, create mood boards, and develop prototypes to ensure alignment. My creative process involves iterative design, incorporating feedback, and refining details until perfection. I believe great builds tell a story and create memorable experiences.",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Award,
    title: "My Achievements",
    content: "Successfully completed numerous high-profile commissions and collaborative projects. Known for delivering quality work on time and exceeding client expectations. Experienced in working with teams, managing large-scale builds, and mentoring aspiring builders. My portfolio showcases diverse projects ranging from showcases to full game environments.",
  },
];

export function AboutMe() {
  const [activeTab, setActiveTab] = useState("overview");

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const ActiveIcon = activeTabData.icon;

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl gradient-text mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">
            Professional Roblox Builder & Developer
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8 items-start">
          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lg:sticky lg:top-24"
          >
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative w-48 h-48 rounded-full border-4 border-primary/30 overflow-hidden bg-card">
                <img
                  src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop"
                  alt="ItsMe_WoCool Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">ItsMe_WoCool</h3>
            <p className="text-primary text-sm mb-4">Roblox Builder</p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm">Verified Builder</span>
            </div>
          </motion.div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Tab Navigation */}
            <div className="mb-6">
              {/* Primary Tab (Overview) */}
              <motion.button
                onClick={() => setActiveTab("overview")}
                className={`w-full mb-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-primary to-accent border-primary text-black"
                    : "bg-card/40 border-primary/20 hover:border-primary/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5" />
                  <span className="font-bold">Overview</span>
                </div>
              </motion.button>

              {/* Secondary Tabs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tabs.slice(1).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-br from-primary/20 to-accent/20 border-primary"
                          : "bg-card/40 border-primary/20 hover:border-primary/40"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon
                          className={`w-5 h-5 ${
                            activeTab === tab.id ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {tab.label}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl border-2 border-primary/20 bg-card/40 backdrop-blur-sm p-8 overflow-hidden"
            >
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                    <ActiveIcon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold">{activeTabData.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed text-base">
                  {activeTabData.content}
                </p>

                {/* Stats or additional info based on tab */}
                {activeTab === "overview" && (
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">5+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">50+</div>
                      <div className="text-xs text-muted-foreground">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">100%</div>
                      <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                    </div>
                  </div>
                )}

                {activeTab === "building" && (
                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <h4 className="font-bold mb-3 text-sm text-primary">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Environment Design", "Lighting", "Terrain", "Architecture", "Custom Assets"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "scripting" && (
                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <h4 className="font-bold mb-3 text-sm text-primary">Technical Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Lua", "Game Mechanics", "UI Systems", "Data Management", "Performance Optimization"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
